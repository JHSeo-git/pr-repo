import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/atom-one-light.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { useEffect, useRef } from 'react';
import { Editor as ReactEditor } from '@toast-ui/react-editor';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useEditorMarkdownState } from '@src/states/editorStates';
import { syntaxHighlightEditorPlugIn } from '@src/lib/utils/tuiPlugins';
import TUIWrapper from '../TUIWrapper';

// TODO: add color custom preset

export type EditorProps = {};

function Editor(props: EditorProps) {
  const firstCome = useRef(true);
  const editorRef = useRef<ReactEditor>(null);
  const [markdown, setEditorMarkdown] = useEditorMarkdownState();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdown(editorRef.current.getInstance().getMarkdown());
  };

  useEffect(() => {
    if (!markdown) return;
    if (!editorRef?.current) return;
    if (!firstCome.current) return;
    editorRef.current.getInstance().setMarkdown(markdown);
    firstCome.current = false;
  }, [markdown, editorRef]);

  return (
    <TUIWrapper>
      <ReactEditor
        ref={editorRef}
        usageStatistics={false}
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
