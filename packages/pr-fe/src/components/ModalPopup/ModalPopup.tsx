import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type ModalPopupProps = {
  children: React.ReactNode;
};

function ModalPopup({ children }: ModalPopupProps) {
  return <div css={fullScreen}>{children}</div>;
}

const fullScreen = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${palette.grey[500]};
  z-index: 99;
`;

export default ModalPopup;
