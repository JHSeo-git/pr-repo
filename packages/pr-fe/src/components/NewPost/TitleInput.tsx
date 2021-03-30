import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type TitleInputProps = {};

function TitleInput(props: TitleInputProps) {
  return (
    <div css={block}>
      <input type="text" />
    </div>
  );
}

const block = css`
  input {
    padding-left: 2rem;
    font-size: 2.125rem;
    height: 4rem;
    width: 50%;
    background: ${palette.blueGrey[200]};
    border: none;
    outline: none;
    font-family: inherit;
  }
`;

export default TitleInput;
