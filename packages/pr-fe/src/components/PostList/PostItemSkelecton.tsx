import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';
import { flash } from '@src/lib/styles/animation';

export type PostItemSkelectonProps = {};

function PostItemSkelecton(
  props: PostItemSkelectonProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div css={skeleton} ref={ref}>
      <div css={pointBorder}></div>
      <div css={titleStyle}></div>
      <div css={contentStyle}></div>
    </div>
  );
}

const skeleton = css`
  min-height: 8rem;
  border-radius: 0.1875rem;
  box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.11),
    0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.08);
  overflow: none;

  & + & {
    margin-top: 1.5rem;
  }
`;

const pointBorder = css`
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
  height: 0.5rem;
  margin-bottom: 1rem;
  background: ${palette.grey[100]};
  animation: ${flash} 1s ease-in-out infinite;
`;

const titleStyle = css`
  width: 50%;
  height: 2rem;
  margin-bottom: 0.75rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background: ${palette.grey[100]};
  animation: ${flash} 1s ease-in-out infinite;
`;
const contentStyle = css`
  height: 3rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background: ${palette.grey[100]};
  animation: ${flash} 1s ease-in-out infinite;
`;

export default forwardRef<HTMLDivElement, PostItemSkelectonProps>(
  PostItemSkelecton
);
