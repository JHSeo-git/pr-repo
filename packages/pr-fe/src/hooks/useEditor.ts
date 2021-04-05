import { generateUrlSlug } from '@src/lib/utils/common';
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

    // console.log(generateUrlSlug(content.title), content.markDown);
    save(generateUrlSlug(content.title), content.markDown);
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
