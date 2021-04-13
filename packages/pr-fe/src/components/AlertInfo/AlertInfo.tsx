import { css } from '@emotion/react';
import { undrawEmpty } from '@src/assets/images';
import media from '@src/lib/styles/media';
import palette from '@src/lib/styles/palette';
import { responsiveWidth } from '@src/lib/styles/responsive';
import zIndex from '@src/lib/styles/zIndex';

type AlertType = 'NoData' | 'NotFound' | 'NotAuthroized';

export type AlertInfoProps = {
  alertType: AlertType;
  text: string;
};

function AlertInfo({ alertType, text }: AlertInfoProps) {
  return (
    <div css={imageWrapper}>
      {alertType === 'NoData' && <img src={undrawEmpty} alt="empty" />}
      <h1>{text}</h1>
    </div>
  );
}

const imageWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${zIndex.absoluteImg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${responsiveWidth};

  img {
    width: 20rem;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 2.25rem;
    color: ${palette.blueGrey[600]};
  }

  ${media.xsmall} {
    img {
      width: 13rem;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export default AlertInfo;
