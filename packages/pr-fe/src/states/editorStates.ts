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

export const observedHeadingIdState = atom<string | null>({
  key: 'observedHeadingIdState',
  default: null,
});

export type EditorContentType = {
  title: string | null;
  markDown: string | null;
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

export function useResetEditorContent() {
  const resetTitle = useResetRecoilState(editorTitleState);
  const resetMarkdown = useResetRecoilState(editorMarkdownState);

  const reset = () => {
    resetTitle();
    resetMarkdown();
  };

  return {
    reset,
  };
}

export function useEditorSync() {
  const setTitle = useSetRecoilState(editorTitleState);
  const setMarkdown = useSetRecoilState(editorMarkdownState);

  const sync = useCallback(
    (data: EditorContentType) => {
      setTitle(data.title);
      setMarkdown(data.markDown);
    },
    [setTitle, setMarkdown]
  );

  return sync;
}
