import { css } from '@emotion/react';
import usePostLoad from '@src/hooks/usePostLoad';
import { useResetEditorContent } from '@src/states/editorStates';
import { useEffect } from 'react';
import Editor from '../Editor';
import WritePostFooter from '../WritePostFooter';
import WritePostTitleInput from './WritePostTitleInput';

export type WritePostProps = {};

function WritePost(props: WritePostProps) {
  const { reset } = useResetEditorContent();
  usePostLoad();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

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
