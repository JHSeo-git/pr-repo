import { generateUrlSlug } from '@src/lib/utils/common';
import { makeContentWithFrontmatter } from '@src/lib/utils/markdownUtil';
import {
  useResetEditorContent,
  useEditorContentValue,
} from '@src/states/editorStates';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';
import useSavePost from './useSavePost';

export default function useEditor() {
  const history = useHistory();
  const content = useEditorContentValue();
  const { reset } = useResetEditorContent();
  const { save, loading, error } = useSavePost();
  const { notify, clearAllToast } = useAppToast();

  useEffect(() => {
    if (!error) return;
    const errorMessage = `Save Failed : ${error}`;
    notify(errorMessage, 'error');
  }, [error, notify]);

  useEffect(() => {
    return () => {
      clearAllToast();
    };
  }, [clearAllToast]);

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
    // TODO: short_description, category
    const postTitle = generateUrlSlug(content.title);
    const postBody = makeContentWithFrontmatter({
      title: content.title,
      body: content.markDown,
      short_description: 'short',
      date,
      category: [],
      user: 'JHSeo',
    });

    save(postTitle, postBody, date);
  };

  const onCancel = () => {
    reset();
    history.replace('/');
  };

  return {
    loading,
    onSave,
    onCancel,
  };
}
