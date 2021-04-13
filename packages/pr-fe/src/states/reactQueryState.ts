import { useCallback } from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

const noCachePostState = atom({
  key: 'noCachePostState',
  default: false,
});

const noCachePostListState = atom({
  key: 'noCachePostListState',
  default: false,
});

export function useNoCachePostValue() {
  return useRecoilValue(noCachePostState);
}

export function useSetNoCachePostState() {
  return useSetRecoilState(noCachePostState);
}

export function useNoCachePostListValue() {
  return useRecoilValue(noCachePostListState);
}

export function useSetNoCachePostListState() {
  return useSetRecoilState(noCachePostListState);
}

export function useResetNoCachePostState() {
  return useResetRecoilState(noCachePostState);
}
export function useResetNoCachePostListState() {
  return useResetRecoilState(noCachePostListState);
}

export function useReactQueryActions() {
  const setNoCachePost = useSetRecoilState(noCachePostState);
  const setNoCachePostList = useSetRecoilState(noCachePostListState);

  const set = useCallback(() => {
    setNoCachePost(true);
    setNoCachePostList(true);
  }, [setNoCachePost, setNoCachePostList]);

  return {
    set,
  };
}
