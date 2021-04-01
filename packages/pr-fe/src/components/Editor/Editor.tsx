import { useRef } from 'react';
import { css } from '@emotion/react';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import hljs from 'highlight.js';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import { useEditorMarkdownState } from '@src/states/editorStates';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import 'highlight.js/styles/github.css';

export type EditorProps = {};

function Editor(props: EditorProps) {
  const editorRef = useRef<ToastEditor>(null);
  const [, setEditorMarkdown] = useEditorMarkdownState();
  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdown(editorRef.current.getInstance().getMarkdown());
  };
  return (
    <div css={wrapper}>
      <ToastEditor
        ref={editorRef}
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        hideModeSwitch={true}
        plugins={[codeSyntaxHighlightPlugin.bind(hljs)]}
        events={{
          change: onChange,
        }}
      />
    </div>
  );
}

const wrapper = css`
  flex: 1;
`;

export default Editor;
