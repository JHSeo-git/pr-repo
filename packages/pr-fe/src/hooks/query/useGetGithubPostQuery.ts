import getPost from '@src/lib/github-api/getPost';
import { GetPostPayload } from '@src/lib/github-api/types';
import { QueryOptionsOf } from '@src/lib/utils/types';
import { useQuery } from 'react-query';

type QueryProps = GetPostPayload;

export default function useGetGithubPostQuery(
  { owner, repo, path }: QueryProps,
  options: QueryOptionsOf<typeof getPost> = {}
) {
  return useQuery(
    createKey(path),
    () => getPost({ owner, repo, path }),
    options
  );
}

const createKey = (path: string) => ['post', path];
useGetGithubPostQuery.createKey = createKey;
