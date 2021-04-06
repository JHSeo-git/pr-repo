import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Viewer as ReactViewer } from '@toast-ui/react-editor';
import { syntaxHighlightViewerPlugIn } from '@src/lib/utils/tuiPlugins';

export type ViewerProps = {
  markdown?: string;
};

function Viewer({ markdown }: ViewerProps) {
  return (
    <ReactViewer
      initialValue={markdown}
      plugins={[syntaxHighlightViewerPlugIn]}
    />
  );
}

export default Viewer;
