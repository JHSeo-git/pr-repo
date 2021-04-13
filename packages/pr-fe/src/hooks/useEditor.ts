import { generateUrlSlug } from '@src/lib/utils/common';
import { makeContentWithFrontmatter } from '@src/lib/utils/markdownUtil';
import {
  useResetEditorContent,
  useEditorContentValue,
  useEditorUpdateModeInfoValue,
} from '@src/states/editorStates';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';
import useSavePost from './useSavePost';

export default function useEditor() {
  const history = useHistory();
  const content = useEditorContentValue();
  const { reset } = useResetEditorContent();
  const { save, loading, error, update } = useSavePost();
  const { notify, clearAllToast } = useAppToast();
  const updateModeInfo = useEditorUpdateModeInfoValue();

  useEffect(() => {
    if (!error) return;
    const errorMessage = `Save Failed : ${error}`;
    notify(errorMessage, 'error');
  }, [error, notify]);

  // useEffect(() => {
  //   return () => {
  //     clearAllToast();
  //   };
  // }, [clearAllToast]);

  const onSaveOrUpdate = () => {
    console.log(content);
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

    if (updateModeInfo.updateMode) {
      if (!updateModeInfo.updatePath) return;
      update({
        path: updateModeInfo.updatePath,
        body: postBody,
        saveDate: date,
      });
    } else {
      save({
        slug: postTitle,
        body: postBody,
        saveDate: date,
      });
    }
  };

  const onCancel = () => {
    reset();
    clearAllToast();
    history.goBack();
  };

  return {
    loading,
    onSave: onSaveOrUpdate,
    onCancel,
    updateModeInfo,
  };
}
