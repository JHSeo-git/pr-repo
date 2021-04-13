import {
  useNoCachePostValue,
  useResetNoCachePostState,
} from '@src/states/reactQueryState';
import { useEffect } from 'react';

export default function useNoCachePostEffect() {
  const resetNoCachePost = useResetNoCachePostState();
  const noCachePost = useNoCachePostValue();

  useEffect(() => {
    if (!noCachePost) return;
    setInterval(() => {
      resetNoCachePost();
    }, 250);
  }, [noCachePost, resetNoCachePost]);
}
