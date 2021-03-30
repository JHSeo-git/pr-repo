import { css } from '@emotion/react';
import Editor from '../Editor';
import TitleInput from './TitleInput';

export type NewPostProps = {};

function NewPost(props: NewPostProps) {
  return (
    <div css={editorWrapper}>
      <TitleInput />
      <Editor />
    </div>
  );
}

const editorWrapper = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default NewPost;
