import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import { Viewer as ReactViewer } from '@toast-ui/react-editor';
import { syntaxHighlightViewerPlugIn } from '@src/lib/utils/tuiPlugins';
import TUIWrapper from '../TUIWrapper';

// import remarkToc from 'remark-toc';
// import unified from 'unified';
// import html from 'rehype-stringify';

export type ViewerProps = {
  markdown?: string;
};

function Viewer({ markdown }: ViewerProps) {
  // console.log(
  //   unified().use(remarkToc).use(html).processSync('# 33 # 44 # 55').toString()
  // );

  return (
    <TUIWrapper>
      <ReactViewer
        initialValue={markdown}
        plugins={[syntaxHighlightViewerPlugIn]}
        extendedAutolinks={true}
        referenceDefinition={true}
      />
    </TUIWrapper>
  );
}

export default Viewer;
