import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';

export const editorMarkdown = atom<string | null>({
  key: 'editorMarkdown',
  default: null,
});

export const editorTitle = atom<string | null>({
  key: 'editorTitle',
  default: null,
});

export type EditorContent = {
  title: string | null;
  markDown: string | null;
};

export const editorContent = selector<EditorContent | null>({
  key: 'editorContent',
  get: ({ get }) => {
    const title = get(editorTitle);
    const markDown = get(editorMarkdown);

    return {
      title,
      markDown,
    };
  },
});

export function useEditorContentValue() {
  return useRecoilValue(editorContent);
}

export function useEditorMarkdownState() {
  return useRecoilState(editorMarkdown);
}

export function useEditorTitleState() {
  return useRecoilState(editorTitle);
}

export function useClearEditorContent() {
  const resetTitle = useResetRecoilState(editorTitle);
  const resetMarkdown = useResetRecoilState(editorMarkdown);

  const clearEditorContent = () => {
    resetTitle();
    resetMarkdown();
  };

  return {
    clearEditorContent,
  };
}
