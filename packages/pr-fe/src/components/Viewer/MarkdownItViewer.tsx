import { useEffect, useRef } from 'react';

import TUIWrapper from '../TUIWrapper';
import { css } from '@emotion/react';
import md from '@src/lib/utils/markdownItClient';

export type MarkdownItViewerProps = {
  markdown: string;
};

function MarkdownItViewer({ markdown }: MarkdownItViewerProps) {
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
  body {
    scroll-behavior: smooth;
  }

  ol {
    counter-reset: list-item;
  }
  li {
    display: block;
    counter-increment: list-item;
  }
  li:before {
    content: counters(list-item, '.') ' ';
  }
`;

export default MarkdownItViewer;
