import { useRef } from 'react';

import TUIWrapper from '../TUIWrapper';
import { css } from '@emotion/react';
import { responsiveReadPostToc } from '@src/lib/styles/responsive';
import zIndex from '@src/lib/styles/zIndex';
import palette from '@src/lib/styles/palette';
import usePostGenerateEffect from '@src/hooks/usePostGenerateEffect';

export type MarkdownItViewerProps = {
  markdown: string;
};

function MarkdownItViewer({ markdown, ...reset }: MarkdownItViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fixedTocPos = 100;

  const { headingId } = usePostGenerateEffect({ ref, markdown, fixedTocPos });

  return (
    <TUIWrapper>
      <div
        ref={ref}
        css={viewerStyle(`${fixedTocPos}px`, `#${headingId}`)}
        className="tui-editor-contents"
      ></div>
    </TUIWrapper>
  );
}

const viewerStyle = (fixedTocPos: string, headerId?: string) => css`
  nav {
    ${responsiveReadPostToc};
    position: absolute;
    top: 0;
    left: 100%;
    ${zIndex.fixedTOC};
    > .md-toc-list {
      width: 20rem;
      border-radius: 0.25rem;
      background: ${palette.grey[50]};
      margin: 0 2rem;
    }
    &.fixed {
      > .md-toc-list {
        position: fixed;
        top: ${fixedTocPos};
      }
    }
    .md-toc-list {
      list-style: none;
      padding-right: 0.5rem;
      padding-left: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 0.875rem;
      a {
        display: block;
        word-break: break-word;
        margin: 0.375rem 0;
        color: ${palette.blueGrey[500]};
        transition: all 0.1s linear;
        &:hover {
          color: ${palette.blue[500]};
          text-decoration: none;
        }
        &[href='${headerId}'] {
          color: ${palette.lightBlue[500]};
          font-weight: bold;
          transform: scale3d(1, 1, 1.5);
        }
      }
      .md-toc-item {
        &::before {
          content: none;
        }
        .md-toc-list {
          padding: 0;
          padding-left: 0.5rem;
          margin-left: 1rem;
        }
      }
    }
  }
`;

export default MarkdownItViewer;
