import { css } from '@emotion/react';
import { useClearEditorContent } from '@src/states/editorStates';
import { useEffect } from 'react';
import Editor from '../Editor';
import WritePostFooter from '../WritePostFooter';
import WritePostTitleInput from './WritePostTitleInput';

export type WritePostProps = {};

function WritePost(props: WritePostProps) {
  const { clearEditorContent } = useClearEditorContent();
  useEffect(() => {
    return () => clearEditorContent();
  }, [clearEditorContent]);

  return (
    <div css={editorWrapper}>
      <WritePostTitleInput />
      <Editor />
      <WritePostFooter />
    </div>
  );
}

const editorWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WritePost;
