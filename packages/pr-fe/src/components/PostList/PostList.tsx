import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkelecton from './PostItemSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';
import useGetPostsQuery from '@src/hooks/query/useGetPostsQuery';

export type PostListProps = {};

function PostList(props: PostListProps) {
  const { data } = useGetPostsQuery();

  const posts = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  console.log('rerender');

  return (
    <ul css={listStyle}>
      {posts
        ? posts.map((post) => <PostItem key={post.id} post={post} />)
        : Array.from({ length: 5 }).map((_, i) => (
            <PostItemSkelecton key={i} />
          ))}
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
