import { css } from '@emotion/react';
import { flash } from '@src/lib/styles/animation';
import palette from '@src/lib/styles/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';

export type ReadPostSkeletonProps = {};

function ReadPostSkeleton(props: ReadPostSkeletonProps) {
  return (
    <div css={skeleton}>
      <div className="skeleton title" />
      <div className="skeleton date" />
      <div className="content">
        <div className="skeleton h"></div>
        <div className="skeleton p"></div>
        <div className="skeleton image"></div>
      </div>
      <div className="content">
        <div className="skeleton h"></div>
        <div className="skeleton p"></div>
        <div className="skeleton image"></div>
      </div>
    </div>
  );
}

const skeleton = css`
  ${responsiveWidth};
  display: flex;
  flex-direction: column;

  .skeleton {
    border-radius: 0.1875rem;
    background: ${palette.grey[100]};
    animation: ${flash} 1s ease-in-out infinite;
  }

  .title {
    width: 100%;
    height: 5rem;
    margin-bottom: 0.5rem;
  }
  .date {
    width: 10rem;
    height: 1.5rem;
    margin-bottom: 3rem;
    align-self: flex-end;
  }
  .content {
    width: 100%;
    margin-bottom: 1rem;
    .h {
      height: 3rem;
      margin-right: 20rem;
      margin-bottom: 0.5rem;
    }
    .p {
      height: 1.5rem;
      margin-right: 5rem;
      margin-bottom: 0.5rem;
    }
    .image {
      height: 7rem;
    }
  }
`;

export default ReadPostSkeleton;
