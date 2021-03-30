import { Editor as ToastEditor } from '@toast-ui/react-editor';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { css } from '@emotion/react';

export type EditorProps = {};

function Editor(props: EditorProps) {
  return (
    <div css={wrapper}>
      <ToastEditor previewStyle="vertical" height="100%" />
    </div>
  );
}

const wrapper = css`
  flex: 1;
`;

export default Editor;
