import { css } from '@emotion/react';
import media from './media';

export const responsiveWidth = css`
  // margin-left + margin-right = 400px
  /* ${media.xxlarge} {
    width: 65rem;
  } */
  /* ${media.xlarge} {
    width: 55rem;
  } */
  width: 55rem;
  ${media.large} {
    width: 39rem;
  }
  ${media.custom(650)} {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;
