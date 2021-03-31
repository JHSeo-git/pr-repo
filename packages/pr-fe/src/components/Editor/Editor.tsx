import { Editor as ToastEditor } from '@toast-ui/react-editor';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { css } from '@emotion/react';
import { useEditorMarkdownState } from '@src/states/editorStates';
import { useRef } from 'react';

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
