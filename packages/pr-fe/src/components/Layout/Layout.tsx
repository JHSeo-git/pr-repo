import { css } from '@emotion/react';
import palette from '@src/lib/styles/palette';
import zIndex from '@src/lib/styles/zIndex';
import Headroom from 'react-headroom';

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
  // return <header css={headerStyle}>{children}</header>;
  return (
    <Headroom disableInlineStyles={true} css={headerStyle}>
      {children}
    </Headroom>
  );
}

export type FooterProps = {
  children: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  return <footer css={footerStyle}>{children}</footer>;
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
  width: 100%;
  background: white;
  ${zIndex.fixedHeader};
  /* background: linear-gradient(
      110.7deg,
      rgba(255, 255, 255, 0.7) 1.64%,
      rgba(255, 255, 255, 0) 94.31%
    ),
    #c7f5db; */
  .headroom {
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: inherit;
    transition: box-shadow 200ms ease-in-out;
    z-index: inherit;
    &--scrolled {
      transition: transform 200ms ease-in-out;
    }
    &--unfixed {
      position: relative;
      transform: translateY(0);
    }
    &--unpinned {
      position: fixed;
      transform: translateY(-100%);
    }
    &--pinned {
      position: fixed;
      transform: translateY(0%);
      box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.22),
        0 0.4375rem 0.625rem rgba(0, 0, 0, 0.12);
    }
  }
`;

const footerStyle = css`
  height: 2.5rem;
  border-top: 0.0625rem solid ${palette.blueGrey[50]};
`;

const mainStyle = css`
  position: relative;
  min-height: calc(100% - (4rem + 2.5rem));
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
