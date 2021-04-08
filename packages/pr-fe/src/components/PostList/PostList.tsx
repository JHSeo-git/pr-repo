import React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkelecton from './PostItemSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { undrawEmpty } from '@src/assets/images';
import palette from '@src/lib/styles/palette';
import media from '@src/lib/styles/media';
import FloatLink from '../FloatLink';
import useGetGithubPostsBySearch from '@src/hooks/query/useGetGithubPostsBySearch';

export type PostListProps = {};

function PostList(props: PostListProps) {
  const { owner, repo, postPath } = useGithubAPIValue();
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

  if (posts && posts.length === 0)
    return (
      <div css={imageWrapper}>
        <img src={undrawEmpty} alt="empty" />
        <h1>No Posts</h1>
      </div>
    );
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
      <FloatLink name="write" to="/new-post" />
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

const imageWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${responsiveWidth};

  img {
    width: 20rem;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2.25rem;
    color: ${palette.blueGrey[600]};
  }

  ${media.xsmall} {
    img {
      width: 13rem;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export default PostList;
