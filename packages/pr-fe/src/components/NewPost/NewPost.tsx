import { css } from '@emotion/react';
import Editor from '../Editor';
import NewPostTitleInput from './NewPostTitleInput';

export type NewPostProps = {};

function NewPost(props: NewPostProps) {
  return (
    <div css={editorWrapper}>
      <NewPostTitleInput />
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
