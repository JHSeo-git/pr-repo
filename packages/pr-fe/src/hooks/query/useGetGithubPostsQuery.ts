import getPostsByRecursive from '@src/lib/github-api/getPostsByRecursive';
import { GetPostsByRecursivePayload } from '@src/lib/github-api/types';
import { QueryOptionsOf } from '@src/lib/utils/types';
import { useQuery } from 'react-query';

export default function useGetGithubPostsQuery(
  props: GetPostsByRecursivePayload,
  options: QueryOptionsOf<typeof getPostsByRecursive> = {}
) {
  return useQuery(createKey(), () => getPostsByRecursive(props), options);
}

const createKey = () => ['posts'];

useGetGithubPostsQuery.createKey = createKey;
