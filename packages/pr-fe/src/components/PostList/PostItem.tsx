import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import useGetGithubPostQuery from '@src/hooks/query/useGetGithubPostQuery';
import palette from '@src/lib/styles/palette';
import { parseFrontmatterOfContent } from '@src/lib/utils/markdownUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useHistory } from 'react-router';
import { useSetViewerState } from '@src/states/viewerStates';
import { encodeParamSlash } from '@src/lib/utils/common';
import PostItemSkelecton from './PostItemSkelecton';

export type PostItemProps = {
  index: number;
  path: string;
};

function PostItem({ index, path }: PostItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const [isView, setIsView] = useState(false);
  const { owner, repo } = useGithubAPIValue();
  const history = useHistory();
  const set = useSetViewerState();
  const { data, isError } = useGetGithubPostQuery(
    {
      owner: owner!,
      repo: repo!,
      path,
    },
    {
      enabled: owner !== undefined && repo !== undefined && isView,
    }
  );

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

  const onClick = () => {
    if (!postContent) return;

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

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsView(true);
          }
        });
      }),
    [setIsView]
  );

  useEffect(() => {
    if (!ref?.current) return;
    const el = ref.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [observer]);

  if (isError) return null;

  return (
    <li ref={ref} css={listStyle}>
      {postContent ? (
        <div css={itemStyle} onClick={onClick}>
          <div css={pointBorder(index)} />
          <h2>{postContent.title}</h2>
          <p>{postContent.short_description}</p>
        </div>
      ) : (
        <PostItemSkelecton />
      )}
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

const listStyle = css`
  & + & {
    margin-top: 1.5rem;
  }
`;
const itemStyle = css`
  min-height: 8rem;
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

  h2 {
    margin: 0;
    padding: 0 1rem;
    font-size: 1.75rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    color: ${palette.blueGrey[900]};
  }
  p {
    margin: 0;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${palette.blueGrey[700]};
  }
`;

export default PostItem;
