import React from 'react';
import { css } from '@emotion/react';
import usePosts from '@src/hooks/usePosts';
import media from '@src/lib/styles/media';
import PostItem from './PostItem';
import PostSkelecton from './PostListSkelecton';

export type PostListProps = {};

function PostList(props: PostListProps) {
  const { posts, error } = usePosts();

  if (error) {
    console.log(error);
  }

  return (
    <ul css={listStyle}>
      {posts ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <PostSkelecton />
      )}
    </ul>
  );
}

const listStyle = css`
  padding: 0;
  margin: 0;
  list-style: none;
  padding-bottom: 2rem;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  // margin-left + margin-right = 400px
  width: 65rem;
  /* ${media.xxlarge} {
    width: 65rem;
  } */
  ${media.xlarge} {
    width: 55rem;
  }
  ${media.large} {
    width: 39rem;
  }
`;

export default PostList;
