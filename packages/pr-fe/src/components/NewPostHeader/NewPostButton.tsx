import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type NewPostButtonProps = {
  text: string;
  onClick(): void;
  primary?: boolean;
};

function NewPostButton({ text, onClick, primary = false }: NewPostButtonProps) {
  return (
    <button css={buttonStyle(primary)} onClick={onClick}>
      {text}
    </button>
  );
}

const buttonStyle = (primary: boolean) => css`
  border: none;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
  margin-left: 0.5rem;

  background: ${palette.teal[500]};
  &:hover {
    background: ${palette.teal[700]};
  }
  &:active {
    background: ${palette.teal[400]};
  }
  &:disabled {
    opacity: 0.6;
  }
  ${primary &&
  css`
    background: ${palette.red[500]};
    &:hover {
      background: ${palette.red[700]};
    }
    &:active {
      background: ${palette.red[400]};
    }
  `}
`;

export default NewPostButton;
