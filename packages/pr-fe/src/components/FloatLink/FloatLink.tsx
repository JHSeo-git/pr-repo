import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';
import { Link } from 'react-router-dom';
import AppIcon, { IconType } from '../AppIcon/AppIcon';

type PositionType = 'top' | 'bottom';

export type FloatLinkProps = {
  name: IconType;
  to: string;
  position?: PositionType;
  color?: string;
};

function FloatLink({
  name,
  to,
  position = 'bottom',
  color = palette.blue[500],
}: FloatLinkProps) {
  return (
    <Link css={floatStyle(position, color)} to={to}>
      <AppIcon name={name} />
    </Link>
  );
}

const floatStyle = (position: PositionType, color: string) => css`
  position: fixed;
  right: 2rem;
  ${position === 'bottom' &&
  css`
    bottom: 4rem;
  `}
  ${position === 'top' &&
  css`
    bottom: 9rem;
  `}
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background: ${color};
  svg {
    height: 2rem;
    width: 2rem;
    color: white;
  }
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.16),
      0 3px 6px rgba(0, 0, 0, 0.23);
  }
  &:active {
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.17),
      0 0.25rem 0.3125rem rgba(0, 0, 0, 0.11);
  }
`;

export default FloatLink;
