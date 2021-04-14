import { useCallback, useState } from 'react';
import mime from 'mime-types';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import * as githubApi from '@src/lib/github-api';
import useAppToast from './useAppToast';
import {
  dateFolderFormat,
  dateNowDefaultFormat,
} from '@src/lib/utils/dateUtil';

export default function useUploadImage() {
  const { owner, repo, master, githubUrlImagePrefix } = useGithubAPIValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { notify } = useAppToast();

  const validateImage = useCallback(
    (file: File) => {
      try {
        if (!file.type.includes('image')) {
          const error = new Error('Filetype is not a Image');
          error.name = 'NotFileTypeImage';
          throw error;
        }
        // 15MB
        if (file.size > 1024 * 1024 * 15) {
          const error = new Error('Image size must be under 15MB');
          error.name = 'BigImageSize';
          throw error;
        }

        const contentType = mime.lookup(file.name);
        if (!contentType) {
          const error = new Error('Not found Content-type');
          error.name = 'NotFoundContentType';
          throw error;
        }

        if (!contentType.includes('image')) {
          const error = new Error('Contenttype is not a Image');
          error.name = 'NotContentTypeImage';
          throw error;
        }
        return true;
      } catch (e) {
        notify(e, 'error');
        return false;
      }
    },
    [notify]
  );

  const upload = useCallback(
    async ({
      file,
      imageContent,
      saveDate,
    }: {
      file: File;
      imageContent: string;
      saveDate: Date;
    }) => {
      if (!repo || !owner || !master || !githubUrlImagePrefix) {
        notify('Github Config is not defined', 'error');
        return;
      }

      if (!validateImage(file)) {
        return;
      }

      const dateFolder = dateFolderFormat(saveDate);
      const uniqueImageName = `${dateFolder}-${dateNowDefaultFormat()}-${
        file.name
      }`;
      const path = `posts/${dateFolder}/images/${uniqueImageName}`;

      try {
        setLoading(true);
        setError(null);

        const data = await githubApi.createOrUpdateContent({
          owner,
          repo,
          path,
          branch: master,
          message: `[Upload] ${file.name}`,
          content: imageContent,
        });

        return data.content.download_url;
      } catch (e) {
        const issueTitle = `Image Upload Error ${path}`;
        const issueBody = `
        Name: ImageUploadError

        Content: ${e}
        Date: ${Date.now().toLocaleString()}
      `;

        setError(e);

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
    },
    [
      setLoading,
      master,
      error,
      notify,
      owner,
      repo,
      validateImage,
      githubUrlImagePrefix,
    ]
  );

  return {
    upload,
    loading,
    error,
  };
}
