import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkelecton from './PostItemSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import FloatLink from '../FloatLink';
import useGetGithubPostsBySearch from '@src/hooks/query/useGetGithubPostsBySearch';
import AlertInfo from '../AlertInfo';
import { useNoCachePostValue } from '@src/states/reactQueryState';
import useNoCachePostListEffect from '@src/hooks/useNoCachePostListEffect';

export type PostListProps = {};

function PostList(props: PostListProps) {
  const { owner, repo, postPath } = useGithubAPIValue();
  const noCache = useNoCachePostValue();
  const {
    data: githubData,
    hasNextPage,
    fetchNextPage,
  } = useGetGithubPostsBySearch(
    {
      owner: owner!,
      repo: repo!,
      path: postPath!,
      extension: 'md',
      perPage: 10,
    },
    {
      enabled:
        owner !== undefined && repo !== undefined && postPath !== undefined,
      refetchOnWindowFocus: true,
    }
  );
  console.log(noCache);
  useNoCachePostListEffect();

  const posts = useMemo(() => {
    if (!githubData) return null;

    return githubData.pages.flatMap((page) => page.data);
  }, [githubData]);

  const infiniteRef = useRef<HTMLDivElement>(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      }),
    [fetchNextPage]
  );

  useEffect(() => {
    if (!posts) return;
    if (!infiniteRef.current) return;
    const el = infiniteRef.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [posts, observer]);

  if (!posts) return null;

  return (
    <>
      <ul css={listStyle}>
        {posts
          ? posts.map(
              (post, i) =>
                post.path && (
                  <PostItem key={post.path} index={i} path={post.path} />
                )
            )
          : Array.from({ length: 5 }).map((_, i) => (
              <PostItemSkelecton key={i} />
            ))}
        {hasNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <PostItemSkelecton
              key={i}
              ref={i === 0 ? infiniteRef : undefined}
            />
          ))}
      </ul>
      {posts && posts.length === 0 && (
        <AlertInfo alertType="NoData" text="No Posts" />
      )}
      <FloatLink name="write" to="/write" />
    </>
  );
}

const listStyle = css`
  padding: 0;
  margin: 0;
  list-style: none;
  padding-bottom: 2rem;
  ${responsiveWidth};
`;

export default PostList;
