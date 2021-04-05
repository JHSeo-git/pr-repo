import { css } from '@emotion/react';
import { responsiveWidth } from '@src/lib/styles/responsive';
import LogoLink from '../LogoLink';
// const { REACT_APP_GITHUB_REPO: targetRepo,
//   REACT_APP_GITHUB_OWNER: owner } = process.env;

export type WritePostHeaderProps = {};

function WritePostHeader(props: WritePostHeaderProps) {
  return (
    <div css={headerStyle}>
      <LogoLink />
    </div>
  );
}

const headerStyle = css`
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  ${responsiveWidth};
`;

export default WritePostHeader;
