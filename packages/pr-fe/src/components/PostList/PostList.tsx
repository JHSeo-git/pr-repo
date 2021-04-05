import { useMemo } from 'react';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkelecton from './PostItemSkelecton';
import { responsiveWidth } from '@src/lib/styles/responsive';
import useGetGithubPostsQuery from '@src/hooks/query/useGetGithubPostsQuery';

const {
  REACT_APP_GITHUB_REPO: repo,
  REACT_APP_GITHUB_OWNER: owner,
} = process.env;

export type PostListProps = {};

function PostList(props: PostListProps) {
  const { data: githubData } = useGetGithubPostsQuery({
    owner: owner ?? '',
    repo: repo ?? '',
  });

  console.log('github ', githubData);

  const posts = useMemo(() => {
    if (!githubData) return null;
    return githubData.map((item) => ({
      id: item.path,
      title: item.path,
      body: item.url,
    }));
  }, [githubData]);

  return (
    <ul css={listStyle}>
      {posts
        ? posts.map((post) => (
            <PostItem key={post.id} title={post.title ?? ''} body={post.body} />
          ))
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
