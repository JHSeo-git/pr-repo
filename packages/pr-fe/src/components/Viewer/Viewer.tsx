import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Viewer as ReactViewer } from '@toast-ui/react-editor';
import ToastViewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import hljs from 'highlight.js';

export type ViewerProps = {
  markdown?: string;
};

function Viewer({ markdown }: ViewerProps) {
  const syntaxHighlightPlugIn = () => {
    const languages = hljs.listLanguages();
    languages.forEach((type) => {
      const convertor = (codeText: string) =>
        hljs.highlight(codeText, { language: type }).value;
      const aliases = hljs.getLanguage(type)?.aliases || [];
      const langTypes = [type, ...aliases];

      langTypes.forEach((lang) => {
        ToastViewer.codeBlockManager.setReplacer(lang, convertor);
      });
    });
  };
  return (
    <ReactViewer initialValue={markdown} plugins={[syntaxHighlightPlugIn]} />
  );
}

export default Viewer;
