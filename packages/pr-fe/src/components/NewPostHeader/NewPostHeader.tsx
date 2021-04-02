import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import { responsiveWidth } from '@src/lib/styles/responsive';
import LogoLink from '../LogoLink';
import NewPostButton from './NewPostButton';

// const { REACT_APP_GITHUB_REPO: targetRepo,
//   REACT_APP_GITHUB_OWNER: owner } = process.env;

export type NewPostHeaderProps = {};

function NewPostHeader(props: NewPostHeaderProps) {
  const { onSave, onCancel } = useEditor();
  return (
    <div css={headerStyle}>
      <LogoLink />
      <div css={group}>
        <NewPostButton text="Cancel" onClick={onCancel} />
        <NewPostButton text="Push" primary={true} onClick={onSave} />
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
  padding: 0 1rem;
  ${responsiveWidth};
`;

const group = css`
  display: flex;
`;

export default NewPostHeader;
