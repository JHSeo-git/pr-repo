import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type NewPostTitleInputProps = {
  placeholder?: string;
};

function NewPostTitleInput({
  placeholder = 'Please Write post title...',
}: NewPostTitleInputProps) {
  return (
    <div css={block}>
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

const block = css`
  input {
    padding-left: 2rem;
    font-size: 2rem;
    height: 5rem;
    width: 50%;
    background: ${palette.blueGrey[200]};
    border: none;
    outline: none;
    font-family: inherit;
  }
`;

export default NewPostTitleInput;
