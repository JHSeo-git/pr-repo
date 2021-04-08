import { PostWithFrontmatterType } from '@src/lib/types/post';
import { parseFrontmatterOfContent } from '@src/lib/utils/markdownUtil';
import { useGithubAPIValue } from '@src/states/githubAPIstates';
import { useMemo } from 'react';
import useGetGithubPostQuery from './query/useGetGithubPostQuery';

export default function useGetGithubPost(path?: string) {
  const { owner, repo } = useGithubAPIValue();
  const { data, isLoading } = useGetGithubPostQuery(
    {
      owner: owner!,
      repo: repo!,
      path: path!,
    },
    {
      enabled: path !== undefined && owner !== undefined && repo !== undefined,
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
  };
}
