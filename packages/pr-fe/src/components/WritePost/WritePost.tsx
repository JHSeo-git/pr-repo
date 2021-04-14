import { css } from '@emotion/react';
import usePostLoad from '@src/hooks/usePostLoad';
import {
  useEditorWriteDateTime,
  useResetEditorContent,
} from '@src/states/editorStates';
import { useEffect } from 'react';
import Editor from '../Editor';
import WritePostFooter from '../WritePostFooter';
import WritePostTitleInput from './WritePostTitleInput';

export type WritePostProps = {};

function WritePost(props: WritePostProps) {
  const { reset } = useResetEditorContent();
  const [editorWriteDate, setEditorWriteDate] = useEditorWriteDateTime();
  usePostLoad();

  useEffect(() => {
    setEditorWriteDate(new Date(Date.now()));
  }, [setEditorWriteDate]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // TODO: full screen loader
  if (!editorWriteDate) return <div>not ready...</div>;

  return (
    <div css={editorWrapper}>
      <WritePostTitleInput />
      <Editor writeDate={editorWriteDate} />
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
