import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { useRef } from 'react';
import { Editor as ReactEditor } from '@toast-ui/react-editor';
import ToastEditor from '@toast-ui/editor';
import hljs from 'highlight.js';
import { useEditorMarkdownState } from '@src/states/editorStates';

export type EditorProps = {};

function Editor(props: EditorProps) {
  const editorRef = useRef<ReactEditor>(null);
  const [, setEditorMarkdown] = useEditorMarkdownState();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdown(editorRef.current.getInstance().getMarkdown());
  };

  const syntaxHighlightPlugIn = () => {
    const languages = hljs.listLanguages();
    languages.forEach((type) => {
      const convertor = (codeText: string) =>
        hljs.highlight(codeText, { language: type }).value;
      const aliases = hljs.getLanguage(type)?.aliases || [];
      const langTypes = [type, ...aliases];

      langTypes.forEach((lang) => {
        ToastEditor.codeBlockManager.setReplacer(lang, convertor);
      });
    });
  };

  return (
    <ReactEditor
      ref={editorRef}
      initialEditType="markdown"
      previewStyle="vertical"
      height="100%"
      hideModeSwitch={true}
      events={{
        change: onChange,
      }}
      plugins={[syntaxHighlightPlugIn]}
    />
  );
}

export default Editor;
