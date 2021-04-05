import * as githubApi from '@src/lib/github-api';
import {
  dateFolderFormat,
  dateNowDefaultFormat,
} from '@src/lib/utils/dateUtil';
import { useState } from 'react';
import useAppToast from './useAppToast';

const {
  REACT_APP_GITHUB_REPO: repo,
  REACT_APP_GITHUB_OWNER: owner,
  REACT_APP_GITHUB_MASTER: master,
} = process.env;

export default function useSavePost() {
  const [loading, setLoading] = useState(false);
  const { notify } = useAppToast();

  // 0. get master branch for sha
  // 1. create new-branch ref
  // 2. create blob
  // 3. create tree <- blob
  // 4. create commit <- tree
  // 5. update new-branch ref <- commit
  // 6. merge to master <- new-branch
  // 7. remove new-branch ref
  const save = async (slug: string, body: string, saveDate: Date) => {
    if (!repo || !owner || !master) {
      notify('Github Config is not defined', 'error');
      return;
    }
    const newBranchName = `${slug}_${dateNowDefaultFormat()}`;

    try {
      setLoading(true);

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
            path: `posts/${dateFolderFormat(saveDate)}/${newBranchName}.md`,
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
    } catch (e) {
      const issueTitle = `Save Post Error ${newBranchName}`;
      const issueBody = `
        Name: SavePostError

        Content: ${e}
        Date: ${saveDate.toLocaleString()}
      `;
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
    }
  };

  return {
    save,
    loading,
  };
}
