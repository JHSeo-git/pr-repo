import getPostsByRecursive from '@src/lib/github-api/getPostsByRecursive';
import { GetPostsByRecursivePayload } from '@src/lib/github-api/types';
import { QueryOptionsOf } from '@src/lib/utils/types';
import { useQuery } from 'react-query';

type QueryProps = {} & GetPostsByRecursivePayload;

export default function useGetGithubPostsQuery(
  { owner, repo, ref }: QueryProps,
  options: QueryOptionsOf<typeof getPostsByRecursive> = {}
) {
  return useQuery(
    createKey(),
    () =>
      getPostsByRecursive({
        owner,
        repo,
        ref,
      }),
    options
  );
}

const createKey = () => ['posts'];

useGetGithubPostsQuery.createKey = createKey;
