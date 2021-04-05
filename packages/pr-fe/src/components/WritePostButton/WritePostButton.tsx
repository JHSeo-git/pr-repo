import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type WritePostButtonProps = {
  text: string;
  onClick(): void;
  primary?: boolean;
  loading?: boolean;
};

function WritePostButton({
  text,
  onClick,
  primary = false,
  loading = false,
}: WritePostButtonProps) {
  return (
    <button css={buttonStyle(primary)} onClick={onClick} disabled={loading}>
      {loading ? 'loading...' : text}
    </button>
  );
}

const buttonStyle = (primary: boolean) => css`
  border: none;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1;
  height: 2.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;

  color: white;
  background: ${palette.teal[500]};
  &:hover {
    background: ${palette.teal[700]};
  }
  &:active {
    background: ${palette.teal[400]};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

export default WritePostButton;
