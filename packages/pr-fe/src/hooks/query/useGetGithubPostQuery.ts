import getPost from '@src/lib/github-api/getPost';
import { GetPostPayload } from '@src/lib/github-api/types';
import { QueryOptionsOf } from '@src/lib/utils/types';
import { useNoCachePostListValue } from '@src/states/reactQueryState';
import { useQuery } from 'react-query';
import useNoCachePostEffect from '../useNoCachePostEffect';

type QueryProps = GetPostPayload;

export default function useGetGithubPostQuery(
  { owner, repo, path }: QueryProps,
  options: QueryOptionsOf<typeof getPost> = {}
) {
  const noCache = useNoCachePostListValue();
  useNoCachePostEffect();

  return useQuery(createKey(path), () => getPost({ owner, repo, path }), {
    ...(noCache ? { cacheTime: 0 } : {}),
    ...options,
  });
}

const createKey = (path: string) => ['post', path];
useGetGithubPostQuery.createKey = createKey;
