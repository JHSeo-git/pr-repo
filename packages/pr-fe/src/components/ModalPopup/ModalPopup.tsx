import { css } from '@emotion/react';
import zIndex from '@src/lib/styles/zIndex';

export type ModalPopupProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function ModalPopup({ children, ...rest }: ModalPopupProps) {
  return (
    <div css={fullScreen} {...rest}>
      {children}
    </div>
  );
}

const fullScreen = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  ${zIndex.fullScreenLoader};
`;

export default ModalPopup;
