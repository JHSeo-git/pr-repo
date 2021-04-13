import * as githubApi from '@src/lib/github-api';
import { encodeParamSlash } from '@src/lib/utils/common';
import {
  dateFolderFormat,
  dateNowDefaultFormat,
} from '@src/lib/utils/dateUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useReactQueryActions } from '@src/states/reactQueryState';
import { useState } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';

type SavePostPayload = {
  slug: string;
  body: string;
  saveDate: Date;
};
type UpatePostPayload = {
  path: string;
  body: string;
  saveDate: Date;
};

export default function useSavePost() {
  const { owner, repo, master } = useGithubAPIValue();
  const { set } = useReactQueryActions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { notify } = useAppToast();
  const history = useHistory();

  // 0. get master branch for sha
  // 1. create new-branch ref
  // 2. create blob
  // 3. create tree <- blob
  // 4. create commit <- tree
  // 5. update new-branch ref <- commit
  // 6. merge to master <- new-branch
  // 7. remove new-branch ref
  const save = async ({ slug, body, saveDate }: SavePostPayload) => {
    if (!repo || !owner || !master) {
      notify('Github Config is not defined', 'error');
      return;
    }
    const newBranchName = `${dateNowDefaultFormat()}_${slug}`;
    const path = `posts/${dateFolderFormat(saveDate)}/${newBranchName}.md`;

    try {
      setLoading(true);
      setError(null);

      const masterBranch = await githubApi.getMasterBranch({
        owner,
        repo,
        ref: master,
      });
      await githubApi.createBranch({
        owner,
        repo,
        ref: newBranchName,
        sha: masterBranch.object.sha,
      });
      const newBlob = await githubApi.createBlob({
        owner,
        repo,
        content: body,
      });
      const newTree = await githubApi.createTree({
        owner,
        repo,
        tree: [
          {
            path,
            mode: '100644',
            type: 'blob',
            sha: newBlob.sha,
          },
        ],
      });
      const newCommit = await githubApi.createCommit({
        owner,
        repo,
        message: `[ADD] Post: ${newBranchName}.md`,
        treeSha: newTree.sha,
      });
      await githubApi.updateBranch({
        owner,
        repo,
        ref: newBranchName,
        sha: newCommit.sha,
        force: true,
      });
      await githubApi.mergeToMaster({
        owner,
        repo,
        head: newBranchName,
        base: 'master',
      });

      notify('Success Post Save!', 'success');
      set();
      history.replace(`/post/${encodeParamSlash(path)}`);
    } catch (e) {
      const issueTitle = `Save Post Error ${newBranchName}`;
      const issueBody = `
        Name: SavePostError

        Content: ${e}
        Date: ${saveDate.toLocaleString()}
      `;

      setError(issueTitle);

      await githubApi.createIssue({
        owner,
        repo,
        title: issueTitle,
        body: issueBody,
        labels: ['error'],
      });
    } finally {
      await githubApi.removeBranch({
        owner,
        repo,
        ref: newBranchName,
      });
      setLoading(false);
      if (error) {
        notify(`Error: ${error}`, 'error');
      }
    }
  };

  // 0. get master branch ref
  // 1. create blob
  // 2. create tree with base_tree <- blob
  // 3. create commit <- tree
  // 4. update master ref(push) <- commit
  const update = async ({ path, body, saveDate }: UpatePostPayload) => {
    if (!repo || !owner || !master) {
      notify('Github Config is not defined', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const masterBranch = await githubApi.getMasterBranch({
        owner,
        repo,
        ref: master,
      });
      const newBlob = await githubApi.createBlob({
        owner,
        repo,
        content: body,
      });
      const newTree = await githubApi.createTree({
        owner,
        repo,
        tree: [
          {
            path: path,
            mode: '100644',
            type: 'blob',
            sha: newBlob.sha,
          },
        ],
        baseTree: masterBranch.object.sha,
      });
      const newCommit = await githubApi.createCommit({
        owner,
        repo,
        message: `[Update] Post: ${path}.md`,
        treeSha: newTree.sha,
      });
      await githubApi.updateBranch({
        owner,
        repo,
        ref: master,
        sha: newCommit.sha,
        force: true,
      });
      notify('Success Post Update!', 'success');
      set();
      history.replace(`/post/${encodeParamSlash(path)}`);
    } catch (e) {
      const issueTitle = `Update Post Error ${path}`;
      const issueBody = `
        Name: UpdatePostError

        Content: ${e}
        Date: ${saveDate.toLocaleString()}
      `;

      setError(issueTitle);

      await githubApi.createIssue({
        owner,
        repo,
        title: issueTitle,
        body: issueBody,
        labels: ['error'],
      });
    } finally {
      setLoading(false);
      if (error) {
        notify(`Error: ${error}`, 'error');
      }
    }
  };

  return {
    save,
    update,
    loading,
    error,
  };
}
