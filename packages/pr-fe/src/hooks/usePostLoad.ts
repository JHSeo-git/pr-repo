import { useEditorSync, useResetEditorContent } from '@src/states/editorStates';
import { useEffect } from 'react';
import useGetGithubPost from './useGetGithubPost';

export default function usePostLoad(path?: string) {
  const sync = useEditorSync();
  const { post } = useGetGithubPost(path);
  const { reset } = useResetEditorContent();

  useEffect(() => {
    if (!post) return;
    sync({
      title: post.title,
      markDown: post.body,
    });

    return () => {
      reset();
    };
  }, [post, sync, reset]);
}
