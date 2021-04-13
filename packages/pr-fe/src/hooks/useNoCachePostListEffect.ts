import {
  useNoCachePostListValue,
  useResetNoCachePostListState,
} from '@src/states/reactQueryState';
import { useEffect } from 'react';

export default function useNoCachePostListEffect() {
  const resetNoCachePostList = useResetNoCachePostListState();
  const noCachePostList = useNoCachePostListValue();

  useEffect(() => {
    if (!noCachePostList) return;
    setInterval(() => {
      resetNoCachePostList();
    }, 250);
  }, [noCachePostList, resetNoCachePostList]);
}
