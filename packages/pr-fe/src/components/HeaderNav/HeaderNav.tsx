import { css } from '@emotion/react';
import media from '@src/lib/styles/media';
import { responsiveWidth } from '@src/lib/styles/responsive';
import LogoLink from '../LogoLink';

export type HeaderNavProps = {};

function HeaderNav(props: HeaderNavProps) {
  return (
    <nav css={navStyle}>
      <LogoLink />
    </nav>
  );
}

const navStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  ${responsiveWidth};
  ${media.custom(650)} {
    padding: 0 1rem;
  }
`;

export default HeaderNav;
