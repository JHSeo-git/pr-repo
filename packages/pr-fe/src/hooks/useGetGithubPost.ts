import { PostWithFrontmatterType } from '@src/lib/types/post';
import { parseFrontmatterOfContent } from '@src/lib/utils/markdownUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useNoCachePostValue } from '@src/states/reactQueryState';
import { useMemo } from 'react';
import useGetGithubPostQuery from './query/useGetGithubPostQuery';

export default function useGetGithubPost(path?: string) {
  const { owner, repo } = useGithubAPIValue();
  const noCache = useNoCachePostValue();
  const { data, isLoading, isError } = useGetGithubPostQuery(
    {
      owner: owner!,
      repo: repo!,
      path: path!,
    },
    {
      enabled:
        path !== undefined &&
        path !== null &&
        owner !== undefined &&
        repo !== undefined,
      ...(noCache ? { cacheTime: 0 } : {}),
    }
  );

  const postContent = useMemo<PostWithFrontmatterType | null>(() => {
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
  }, [data]);

  return {
    post: postContent,
    loading: isLoading,
    isError,
  };
}
