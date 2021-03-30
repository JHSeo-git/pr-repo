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
  height: 4rem;
  /* border-bottom: ${palette.blueGrey[50]}; */
`;
const mainStyle = css``;

Layout.Header = Header;
Layout.Main = Main;

export default Layout;
