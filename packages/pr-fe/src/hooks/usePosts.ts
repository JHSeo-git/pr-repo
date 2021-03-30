import useGetPostsQuery from './query/useGetPostsQuery';

export default function usePosts() {
  const { data, isLoading, error } = useGetPostsQuery();

  return {
    posts: data,
    isLoading,
    error,
  };
}
