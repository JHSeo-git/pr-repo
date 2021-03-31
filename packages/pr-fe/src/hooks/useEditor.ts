import {
  useClearEditorContent,
  useEditorContentValue,
} from '@src/states/editorStates';
import { useHistory } from 'react-router';

export default function useEditor() {
  const history = useHistory();
  const content = useEditorContentValue();
  const { clearEditorContent } = useClearEditorContent();
  const onSave = () => {
    if (!content) return;
    console.log('save :', content);
  };

  const onCancel = () => {
    clearEditorContent();
    history.replace('/');
  };

  return {
    onSave,
    onCancel,
  };
}
