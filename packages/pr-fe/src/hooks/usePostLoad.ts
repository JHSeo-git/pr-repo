import {
  useEditorSync,
  useUpdateTargetSlugState,
} from '@src/states/editorStates';
import { useEffect } from 'react';
import useGetGithubPost from './useGetGithubPost';

export default function usePostLoad() {
  const sync = useEditorSync();
  const [pathslug] = useUpdateTargetSlugState();
  const { post } = useGetGithubPost(pathslug ? pathslug : undefined);

  useEffect(() => {
    if (!post) return;
    sync({
      title: post.title,
      markDown: post.body,
      path: post.path,
    });
  }, [post, sync]);
}
