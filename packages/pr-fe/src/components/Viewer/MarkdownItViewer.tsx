import { useEffect, useRef } from 'react';

import TUIWrapper from '../TUIWrapper';
import { css } from '@emotion/react';
import md from '@src/lib/utils/markdownItClient';
import { responsiveReadPostToc } from '@src/lib/styles/responsive';

export type MarkdownItViewerProps = {
  markdown: string;
};

function MarkdownItViewer({ markdown, ...reset }: MarkdownItViewerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markdown) return;
    if (!ref?.current) return;
    const result = md.render('\n[[toc]]\n' + markdown);
    ref.current.innerHTML = result;
  }, [markdown]);

  console.log('rerender');

  return (
    <TUIWrapper>
      <div ref={ref} css={viewerStyle} className="tui-editor-contents"></div>
    </TUIWrapper>
  );
}

const viewerStyle = css`
  nav {
    ${responsiveReadPostToc};
    position: absolute;
    top: 0;
    right: -50%;
  }
`;

export default MarkdownItViewer;
