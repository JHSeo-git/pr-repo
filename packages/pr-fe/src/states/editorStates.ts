import { useCallback } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

export const editorMarkdownState = atom<string | null>({
  key: 'editorMarkdownState',
  default: null,
});

export const editorTitleState = atom<string | null>({
  key: 'editorTitleState',
  default: null,
});

export const editorThumbnailState = atom<string | null>({
  key: 'editorThumbnailState',
  default: null,
});

export const editorShortDescriptionState = atom<string | null>({
  key: 'editorShortDescriptionState',
  default: null,
});

export const editorReadGithubPath = atom<string | null>({
  key: 'editorReadGithubPath',
  default: null,
});

export const observedHeadingIdState = atom<string | null>({
  key: 'observedHeadingIdState',
  default: null,
});

export const updateModeState = atom({
  key: 'updateModeState',
  default: false,
});

export const updateTargetSlugState = atom<string | null>({
  key: 'updateTargetSlugState',
  default: null,
});

export const editorWriteDateTime = atom<Date | null>({
  key: 'editorWriteDateTime',
  default: null,
});

export type EditorContentType = {
  title: string | null;
  markDown: string | null;
  thumbnail: string | null;
  shortDescription: string | null;
  path?: string | null;
};

export const editorContentState = selector<EditorContentType | null>({
  key: 'editorContentState',
  get: ({ get }) => {
    const title = get(editorTitleState);
    const markDown = get(editorMarkdownState);
    const thumbnail = get(editorThumbnailState);
    const shortDescription = get(editorShortDescriptionState);
    const path = get(editorReadGithubPath);

    return {
      title,
      markDown,
      thumbnail,
      shortDescription,
      path,
    };
  },
});

export const editorUpdateModeInfoState = selector({
  key: 'editorUpdateModeInfoState',
  get: ({ get }) => {
    const updateMode = get(updateModeState);
    const updatePath = get(updateTargetSlugState);

    return {
      updateMode,
      updatePath,
    };
  },
});

export function useEditorContentValue() {
  return useRecoilValue(editorContentState);
}

export function useEditorMarkdownState() {
  return useRecoilState(editorMarkdownState);
}

export function useEditorTitleState() {
  return useRecoilState(editorTitleState);
}

export function useObservedHeadingIdState() {
  return useRecoilState(observedHeadingIdState);
}

export function useUpdateModeState() {
  return useRecoilState(updateModeState);
}

export function useUpdateTargetSlugState() {
  return useRecoilState(updateTargetSlugState);
}

export function useEditorUpdateModeInfoValue() {
  return useRecoilValue(editorUpdateModeInfoState);
}

export function useEditorReadGithubPathState() {
  return useRecoilState(editorReadGithubPath);
}

export function useEditorThumbnailState() {
  return useRecoilState(editorThumbnailState);
}

export function useEditorShortDescriptionState() {
  return useRecoilState(editorShortDescriptionState);
}

export function useEditorWriteDateTime() {
  return useRecoilState(editorWriteDateTime);
}

export function useResetEditorContent() {
  const resetTitle = useResetRecoilState(editorTitleState);
  const resetMarkdown = useResetRecoilState(editorMarkdownState);
  const resetThumbnail = useResetRecoilState(editorThumbnailState);
  const resetShortDescription = useResetRecoilState(
    editorShortDescriptionState
  );
  const resetUpdateMode = useResetRecoilState(updateModeState);
  const resetUpdateTargetSlug = useResetRecoilState(updateTargetSlugState);
  const resetEditorReadGithubPath = useResetRecoilState(editorReadGithubPath);
  const resetEditorWriteDateTime = useResetRecoilState(editorWriteDateTime);

  const reset = useCallback(() => {
    resetTitle();
    resetMarkdown();
    resetUpdateMode();
    resetUpdateTargetSlug();
    resetEditorReadGithubPath();
    resetEditorWriteDateTime();
    resetThumbnail();
    resetShortDescription();
  }, [
    resetTitle,
    resetMarkdown,
    resetUpdateMode,
    resetUpdateTargetSlug,
    resetEditorReadGithubPath,
    resetEditorWriteDateTime,
    resetThumbnail,
    resetShortDescription,
  ]);

  return {
    reset,
  };
}

export function useEditorSync() {
  const setTitle = useSetRecoilState(editorTitleState);
  const setMarkdown = useSetRecoilState(editorMarkdownState);
  const setEditorReadGithubPath = useSetRecoilState(editorReadGithubPath);
  const setThumbnail = useSetRecoilState(editorThumbnailState);
  const setShortDescription = useSetRecoilState(editorShortDescriptionState);

  const sync = useCallback(
    (data: EditorContentType) => {
      setTitle(data.title);
      setMarkdown(data.markDown);
      setEditorReadGithubPath(data.path ? data.path : null);
      setThumbnail(data.thumbnail);
      setShortDescription(data.shortDescription);
    },
    [
      setTitle,
      setMarkdown,
      setEditorReadGithubPath,
      setThumbnail,
      setShortDescription,
    ]
  );

  return sync;
}
