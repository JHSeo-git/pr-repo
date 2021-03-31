import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return <div css={layoutStyle}>{children}</div>;
}

export type HeaderProps = {
  children: React.ReactNode;
};
function Header({ children }: HeaderProps) {
  return <header css={headerStyle}>{children}</header>;
}

export type MainProps = {
  children: React.ReactNode;
};
function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>;
}

const layoutStyle = css`
  height: 100%;
`;
const headerStyle = css`
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100%;
  /* background: linear-gradient(
      110.7deg,
      rgba(255, 255, 255, 0.7) 1.64%,
      rgba(255, 255, 255, 0) 94.31%
    ),
    #c7f5db; */
  border-bottom: 0.0625rem solid ${palette.blueGrey[50]};
`;
const mainStyle = css`
  padding-top: 4rem;
  height: 100%;
`;

Layout.Header = Header;
Layout.Main = Main;

export default Layout;
