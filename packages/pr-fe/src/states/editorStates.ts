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

export type EditorContentType = {
  title: string | null;
  markDown: string | null;
  path?: string;
};

export const editorContentState = selector<EditorContentType | null>({
  key: 'editorContentState',
  get: ({ get }) => {
    const title = get(editorTitleState);
    const markDown = get(editorMarkdownState);

    return {
      title,
      markDown,
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

export function useResetEditorContent() {
  const resetTitle = useResetRecoilState(editorTitleState);
  const resetMarkdown = useResetRecoilState(editorMarkdownState);
  const resetUpdateMode = useResetRecoilState(updateModeState);
  const resetUpdateTargetSlug = useResetRecoilState(updateTargetSlugState);
  const resetEditorReadGithubPath = useResetRecoilState(editorReadGithubPath);

  const reset = useCallback(() => {
    resetTitle();
    resetMarkdown();
    resetUpdateMode();
    resetUpdateTargetSlug();
    resetEditorReadGithubPath();
  }, [
    resetTitle,
    resetMarkdown,
    resetUpdateMode,
    resetUpdateTargetSlug,
    resetEditorReadGithubPath,
  ]);

  return {
    reset,
  };
}

export function useEditorSync() {
  const setTitle = useSetRecoilState(editorTitleState);
  const setMarkdown = useSetRecoilState(editorMarkdownState);
  const setEditorReadGithubPath = useSetRecoilState(editorReadGithubPath);

  const sync = useCallback(
    (data: EditorContentType) => {
      setTitle(data.title);
      setMarkdown(data.markDown);
      setEditorReadGithubPath(data.path ? data.path : null);
    },
    [setTitle, setMarkdown, setEditorReadGithubPath]
  );

  return sync;
}
