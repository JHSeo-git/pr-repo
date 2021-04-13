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

// TODO: add color custom preset

export type EditorProps = {};

function Editor(props: EditorProps) {
  const editorRef = useRef<ReactEditor>(null);
  const [updateMode] = useUpdateModeState();
  const [markdown, setEditorMarkdown] = useEditorMarkdownState();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdown(editorRef.current.getInstance().getMarkdown());
  };

  if (updateMode && !markdown)
    return <AlertInfo alertType="NotFound" text="Not Found Post" />;

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
      />
    </TUIWrapper>
  );
}

export default Editor;
