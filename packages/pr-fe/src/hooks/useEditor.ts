import { generateUrlSlug } from '@src/lib/utils/common';
import { makeContentWithFrontmatter } from '@src/lib/utils/markdownUtil';
import {
  useClearEditorContent,
  useEditorContentValue,
} from '@src/states/editorStates';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';
import useSavePost from './useSavePost';

export default function useEditor() {
  const history = useHistory();
  const content = useEditorContentValue();
  const { clearEditorContent } = useClearEditorContent();
  const { save, loading } = useSavePost();
  const { notify } = useAppToast();

  const onSave = () => {
    if (!content?.title) {
      notify('Content Title is required', 'error');
      return;
    }
    if (!content?.markDown) {
      notify('Content markdown is required', 'error');
      return;
    }

    const date = new Date(Date.now());
    // TODO: useMemo??
    const postTitle = generateUrlSlug(content.title);
    const postBody = makeContentWithFrontmatter({
      title: content.title,
      body: content.markDown,
      date,
      category: [],
      user: 'JHSeo',
    });

    save(postTitle, postBody, date);
  };

  const onCancel = () => {
    clearEditorContent();
    history.replace('/');
  };

  return {
    loading,
    onSave,
    onCancel,
  };
}
