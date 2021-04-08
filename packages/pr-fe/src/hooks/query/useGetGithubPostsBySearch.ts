import getPostsBySearch from '@src/lib/github-api/getPostsBySearch';
import { GetPostsBySearchPayload } from '@src/lib/github-api/types';
import { PostSearchResult } from '@src/lib/types/post';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

export default function useGetGithubPostsBySearch(
  { owner, repo, extension, path, perPage }: GetPostsBySearchPayload,
  options: UseInfiniteQueryOptions<PostSearchResult, unknown, PostSearchResult>
) {
  return useInfiniteQuery(
    createKey(),
    ({ pageParam = undefined }) =>
      getPostsBySearch({
        owner,
        repo,
        extension,
        path,
        perPage,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.length === perPage ? lastPage.nextPage : undefined,
      ...options,
    }
  );
}

const createKey = () => ['posts'];
useGetGithubPostsBySearch.createKey = createKey;
