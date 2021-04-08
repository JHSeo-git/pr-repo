import { css } from '@emotion/react';
import usePostLoad from '@src/hooks/usePostLoad';
import Editor from '../Editor';
import WritePostTitleInput from '../WritePost/WritePostTitleInput';
import WritePostFooter from '../WritePostFooter';

export type EditPostProps = {
  path: string;
};

function EditPost({ path }: EditPostProps) {
  usePostLoad(path);

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

export default EditPost;
