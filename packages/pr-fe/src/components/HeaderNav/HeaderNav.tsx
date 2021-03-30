import { css } from '@emotion/react';
import media from '@src/lib/styles/media';
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
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  // margin-left + margin-right = 400px
  width: 65rem;
  /* ${media.xxlarge} {
    width: 65rem;
  } */
  ${media.xlarge} {
    width: 55rem;
  }
  ${media.large} {
    width: 39rem;
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
