import React from 'react';
import PostList from '@src/components/PostList';
import FloatLink from '@src/components/FloatLink';

export type PostsProps = {};

function Posts(props: PostsProps) {
  return (
    <>
      <PostList />
      <FloatLink name="write" to="/new-post" />
    </>
  );
}

export default Posts;
