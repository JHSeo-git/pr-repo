import { getPosts } from '@src/lib/api/posts/getPosts';
import { QueryOptionsOf } from '@src/lib/utils/types';
import { useQuery } from 'react-query';

export default function useGetPostsQuery(
  options: QueryOptionsOf<typeof getPosts> = {}
) {
  return useQuery(createKey(), () => getPosts(), options);
}

const createKey = () => ['test-posts'];

useGetPostsQuery.createKey = createKey;
