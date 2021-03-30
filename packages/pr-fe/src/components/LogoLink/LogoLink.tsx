import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import { NavLink } from 'react-router-dom';

export type LogoLinkProps = {};

function LogoLink(props: LogoLinkProps) {
  return (
    <NavLink css={logoStyle} to="/" exact>
      <img src={logo} alt="logo" />
    </NavLink>
  );
}

const logoStyle = css`
  img {
    height: 3rem;
  }
`;

export default LogoLink;
