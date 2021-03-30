import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import media from '@src/lib/styles/media';
import { NavLink } from 'react-router-dom';
import HeaderNavItem from './HeaderNavItem';

export type HeaderNavProps = {};

function HeaderNav(props: HeaderNavProps) {
  return (
    <nav css={navStyle}>
      <NavLink css={logoStyle} to="/" exact>
        <img src={logo} alt="logo" />
      </NavLink>
      <ul css={listStyle}>
        <HeaderNavItem text="Write" to="/post/write" />
      </ul>
    </nav>
  );
}

const navStyle = css`
  width: 108rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;

  /* ${media.xxxlarge} {

  } */
`;

const logoStyle = css`
  img {
    height: 3rem;
  }
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

export default HeaderNav;
