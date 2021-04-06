import { css } from '@emotion/react';
import media from '@src/lib/styles/media';
import { responsiveWidth } from '@src/lib/styles/responsive';
import LogoLink from '../LogoLink';
import HeaderNavItem from './HeaderNavItem';

export type HeaderNavProps = {};

function HeaderNav(props: HeaderNavProps) {
  return (
    <nav css={navStyle}>
      <LogoLink />
      <ul css={listStyle}>
        <HeaderNavItem text="Write" to="/new-post" />
      </ul>
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

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

export default HeaderNav;
