import { css } from '@emotion/react';
import media from '@src/lib/styles/media';
import LogoLink from '../LogoLink';
import NewPostButton from './NewPostButton';

export type NewPostHeaderProps = {};

function NewPostHeader(props: NewPostHeaderProps) {
  return (
    <div css={headerStyle}>
      <LogoLink />
      <div css={group}>
        <NewPostButton text="저장하기" primary={true} />
        <NewPostButton text="나가기" />
      </div>
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

const group = css`
  display: flex;
`;

export default NewPostHeader;
