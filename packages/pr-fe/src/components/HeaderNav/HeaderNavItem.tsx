import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

export type HeaderNavItemProps = {
  text: string;
  to: string;
};

function HeaderNavItem({ text, to }: HeaderNavItemProps) {
  return (
    <li css={itemStyle}>
      <NavLink to={to}>{text}</NavLink>
    </li>
  );
}

const itemStyle = css``;

export default HeaderNavItem;
