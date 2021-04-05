import { css } from '@emotion/react';
import TextareaAutosize from 'react-textarea-autosize';
import palette from '@src/lib/styles/palette';
import { useEditorTitleState } from '@src/states/editorStates';

export type WritePostTitleInputProps = {
  placeholder?: string;
};

function WritePostTitleInput({
  placeholder = 'Please Write post title...',
}: WritePostTitleInputProps) {
  const [editorTitle, setEditorTitle] = useEditorTitleState();
  return (
    <div css={block}>
      <TextareaAutosize
        css={inputStyle}
        rows={1}
        placeholder={placeholder}
        autoFocus
        value={editorTitle ?? ''}
        onChange={(e) => setEditorTitle(e.target.value)}
      />
    </div>
  );
}

const block = css`
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
`;

const inputStyle = css`
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 2.25rem;
  line-height: 1.5;
  font-weight: bold;
  width: 100%;
  resize: none;
  color: ${palette.blueGrey[900]};
  &::placeholder {
    color: ${palette.blueGrey[200]};
  }
`;

export default WritePostTitleInput;
