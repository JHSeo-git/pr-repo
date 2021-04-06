import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { PostWithFrontmatterType } from '../lib/types/post';

const viewerState = atom<PostWithFrontmatterType | null>({
  key: 'viewerState',
  default: null,
});

export function useSetViewerState() {
  return useSetRecoilState(viewerState);
}

export function useViewerValue() {
  return useRecoilValue(viewerState);
}
