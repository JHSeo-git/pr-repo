import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';
import { NavLink } from 'react-router-dom';

export type HeaderNavItemProps = {
  text: string;
  to: string;
};

function HeaderNavItem({ text, to }: HeaderNavItemProps) {
  return (
    <li>
      <NavLink css={linkStyle} to={to}>
        {text}
      </NavLink>
    </li>
  );
}

const linkStyle = css`
  text-decoration: none;
  color: ${palette.blueGrey[900]};
  font-size: 1.125rem;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${palette.teal[700]};
  }
`;

export default HeaderNavItem;
