import { css } from '@emotion/react';
import useGetGithubPostQuery from '@src/hooks/query/useGetGithubPostQuery';
import palette from '@src/lib/styles/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { PostWithFrontmatterType } from '@src/lib/types/post';
import { decodeParamSlash } from '@src/lib/utils/common';
import { parseFrontmatterOfContent } from '@src/lib/utils/markdownUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import Viewer from '../Viewer';

export type ReadPostProps = {};

function ReadPost(props: ReadPostProps) {
  const { owner, repo } = useGithubAPIValue();
  const { path: decodedPath } = useParams<{ path: string }>();
  const { data } = useGetGithubPostQuery(
    {
      owner: owner!,
      repo: repo!,
      path: decodeParamSlash(decodedPath),
    },
    {
      enabled:
        decodedPath !== undefined && owner !== undefined && repo !== undefined,
    }
  );

  const postContent = useMemo<PostWithFrontmatterType | null>(() => {
    if (!decodedPath) return null;
    if (!data || !data.content) return null;
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
  }, [decodedPath, data]);

  if (!postContent) return null;

  return (
    <div css={viewerWrapper}>
      <h1 className="title">{postContent.title}</h1>
      <p className="date">{postContent.date.toLocaleString()}</p>
      <Viewer markdown={postContent.body} />
    </div>
  );
}

const viewerWrapper = css`
  ${responsiveWidth};
  display: flex;
  flex-direction: column;
  .title {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 0.0625rem solid ${palette.lightBlue[200]};
  }
  .date {
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    color: ${palette.blueGrey[500]};
    text-align: right;
    margin-bottom: 3rem;
  }
`;

export default ReadPost;
