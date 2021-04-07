import { useEffect, useMemo, useRef } from 'react';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkelecton from './PostItemSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';
import useGetGithubPostsQuery from '@src/hooks/query/useGetGithubPostsQuery';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { undrawEmpty } from '@src/assets/images';
import palette from '@src/lib/styles/palette';
import media from '@src/lib/styles/media';

export type PostListProps = {};

type PostsType = {
  path?: string;
}[];

function PostList(props: PostListProps) {
  const ref = useRef<boolean>(true);
  const { owner, repo } = useGithubAPIValue();
  const { data: githubData, refetch } = useGetGithubPostsQuery(
    {
      owner: owner!,
      repo: repo!,
    },
    {
      enabled: owner !== undefined && repo !== undefined,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (ref?.current) {
      refetch();
      ref.current = false;
    }
  }, [refetch]);

  const posts = useMemo<PostsType | null>(() => {
    if (!githubData) return null;

    return githubData
      .map((item) => ({
        path: item.path,
      }))
      .sort((a, b) => (a.path! > b.path! ? -1 : a.path! < b.path! ? 1 : 0));
  }, [githubData]);

  if (posts && posts.length === 0)
    return (
      <div css={imageWrapper}>
        <img src={undrawEmpty} alt="empty" />
        <h1>No Posts</h1>
      </div>
    );

  return (
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
    </ul>
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
