import React from 'react';
import { css } from '@emotion/react';
import usePosts from '@src/hooks/usePosts';
import PostItem from './PostItem';
import PostSkelecton from './PostListSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';

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
  padding: 0 1rem;
  ${responsiveWidth};
`;

export default PostList;
