import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import WritePostButton from '../WritePostButton';

export type WritePostFooterProps = {};

function WritePostFooter(props: WritePostFooterProps) {
  const { onSave, onCancel, loading, updateModeInfo } = useEditor();
  return (
    <footer css={block}>
      <WritePostButton text="Cancel" onClick={onCancel} />
      <WritePostButton
        text={updateModeInfo.updateMode ? 'Update' : 'Save'}
        primary={true}
        onClick={onSave}
        loading={loading}
      />
    </footer>
  );
}

const block = css`
  height: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default WritePostFooter;
