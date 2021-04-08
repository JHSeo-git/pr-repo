import getPostsBySearch from '@src/lib/github-api/getPostsBySearch';
import { GetPostsBySearchPayload } from '@src/lib/github-api/types';
import { Unwrap } from '@src/lib/utils/types';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';

export default function useGetGithubPostsBySearch(
  { owner, repo, extension, path, perPage }: GetPostsBySearchPayload,
  options: UseInfiniteQueryOptions<
    Unwrap<typeof getPostsBySearch>,
    unknown,
    InfiniteData<Unwrap<typeof getPostsBySearch>>
  > = {}
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
        lastPage.items.length === perPage ? lastPage.nextPage : undefined,
      ...options,
    }
  );
}

const createKey = () => ['posts'];
useGetGithubPostsBySearch.createKey = createKey;
