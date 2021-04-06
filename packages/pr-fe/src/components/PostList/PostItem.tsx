import { useMemo } from 'react';
import { css } from '@emotion/react';
import useGetGithubPostQuery from '@src/hooks/query/useGetGithubPostQuery';
import palette from '@src/lib/styles/palette';
import { parseFrontmatterOfContent } from '@src/lib/utils/markdownUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useHistory } from 'react-router';
import { useSetViewerState } from '@src/states/viewerStates';
import { encodeParamSlash } from '@src/lib/utils/common';

export type PostItemProps = {
  index: number;
  path: string;
};

function PostItem({ index, path }: PostItemProps) {
  const { owner, repo } = useGithubAPIValue();
  const history = useHistory();
  const set = useSetViewerState();
  const { data } = useGetGithubPostQuery({
    owner: owner ?? '',
    repo: repo ?? '',
    path,
  });

  const postContent = useMemo(() => {
    if (!data) return null;
    const parsed = parseFrontmatterOfContent(data.content);
    return {
      title: parsed.frontmatter.title,
      date: parsed.frontmatter.date,
      short_description: parsed.frontmatter.short_description,
      category: parsed.frontmatter.category,
      user: parsed.frontmatter.user,
      body: parsed.content,
      path: data.path,
    };
  }, [data]);

  if (!postContent) return null;

  const onClick = () => {
    set({
      title: postContent.title,
      date: postContent.date,
      short_description: postContent.short_description,
      category: postContent.category,
      user: postContent.user,
      body: postContent.body,
    });
    history.push(`/post/${encodeParamSlash(postContent.path)}`);
  };

  return (
    <li css={itemStyle} onClick={onClick}>
      <div css={pointBorder(index)} />
      <h2>{postContent.title}</h2>
      <h2>{postContent.short_description}</h2>
    </li>
  );
}

const pointBorder = (index: number = 1) => css`
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
  height: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${palette.colorArray[index % palette.colorArray.length][200]};
`;

const itemStyle = css`
  min-height: 10rem;
  border-radius: 0.1875rem;
  cursor: pointer;
  box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.11),
    0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.22),
      0 0.4375rem 0.625rem rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.17),
      0 0.25rem 0.3125rem rgba(0, 0, 0, 0.11);
  }

  & + & {
    margin-top: 1.5rem;
  }

  h2 {
    margin: 0;
    padding: 0 1rem;
    font-size: 2rem;
    line-height: 1.5;
    color: ${palette.blueGrey[900]};
  }
  p {
    margin: 0;
    padding: 0 1rem;
    margin-top: 1rem;
    font-size: 0.85rem;
    color: ${palette.blueGrey[700]};
  }
`;

export default PostItem;
