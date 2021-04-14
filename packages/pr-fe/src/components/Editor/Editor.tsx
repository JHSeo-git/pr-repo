import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/atom-one-light.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { useRef } from 'react';
import { Editor as ReactEditor } from '@toast-ui/react-editor';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {
  useEditorMarkdownState,
  useUpdateModeState,
} from '@src/states/editorStates';
import { syntaxHighlightEditorPlugIn } from '@src/lib/utils/tuiPlugins';
import TUIWrapper from '../TUIWrapper';
import AlertInfo from '../AlertInfo';
import useUploadImage from '@src/hooks/useUploadImage';
import useAppToast from '@src/hooks/useAppToast';
import { toBase64 } from '@src/lib/utils/common';

// TODO: add color custom preset

export type EditorProps = {
  writeDate: Date;
};

function Editor({ writeDate }: EditorProps) {
  const editorRef = useRef<ReactEditor>(null);
  const [updateMode] = useUpdateModeState();
  const [markdown, setEditorMarkdown] = useEditorMarkdownState();
  const { upload, error } = useUploadImage();
  const { notify } = useAppToast();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdown(editorRef.current.getInstance().getMarkdown());
  };

  if (updateMode && !markdown)
    return <AlertInfo alertType="NotFound" text="Not Found Post" />;

  if (error) console.log(error);

  console.log('date:', writeDate);

  return (
    <TUIWrapper>
      <ReactEditor
        ref={editorRef}
        usageStatistics={false}
        initialValue={markdown ?? undefined}
        initialEditType="markdown"
        previewStyle="vertical"
        height="100%"
        hideModeSwitch={true}
        events={{
          change: onChange,
        }}
        plugins={[syntaxHighlightEditorPlugIn, colorSyntax]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            try {
              const file = blob as File;
              const base64Result = await toBase64(file);
              const imageUrl = await upload({
                file,
                imageContent: base64Result,
                saveDate: writeDate,
              });

              if (!imageUrl) {
                throw new Error('Upload Failed');
              }
              callback(imageUrl, file.name);
            } catch (e) {
              notify(e);
            }
          },
        }}
      />
    </TUIWrapper>
  );
}

export default Editor;
