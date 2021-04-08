import React from 'react';
import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { decodeParamSlash, encodeParamSlash } from '@src/lib/utils/common';
import { useParams } from 'react-router';
import FloatLink from '../FloatLink';
import Viewer from '../Viewer';
import useGetGithubPost from '@src/hooks/useGetGithubPost';
import ReadPostSkeleton from './ReadPostSkeleton';

export type ReadPostProps = {};

function ReadPost(props: ReadPostProps) {
  const { path: decodedPath } = useParams<{ path: string }>();
  const { post: postContent } = useGetGithubPost(decodeParamSlash(decodedPath));

  if (!postContent) return <ReadPostSkeleton />;

  return (
    <>
      <div css={viewerWrapper}>
        <h1 className="title">{postContent.title}</h1>
        <p className="date">{postContent.date.toLocaleString()}</p>
        <Viewer markdown={postContent.body} />
      </div>
      {postContent.path && (
        <FloatLink
          name="fix"
          to={`/edit/${encodeParamSlash(postContent.path)}`}
        />
      )}
    </>
  );
}

const viewerWrapper = css`
  height: 100%;
  ${responsiveWidth};
  display: flex;
  flex-direction: column;
  .title {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    word-wrap: break-word;
  }
  .date {
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    color: ${palette.blueGrey[300]};
    text-align: right;
    margin-bottom: 3rem;
  }
`;

export default ReadPost;
