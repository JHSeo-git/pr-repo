import hljs from 'highlight.js';
import ToastViewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import ToastEditor from '@toast-ui/editor';

export const syntaxHighlightViewerPlugIn = () => {
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

export const syntaxHighlightEditorPlugIn = () => {
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
