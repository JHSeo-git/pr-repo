import WritePost from '@src/components/WritePost';
import { decodeParamSlash } from '@src/lib/utils/common';
import {
  useUpdateModeState,
  useUpdateTargetSlugState,
} from '@src/states/editorStates';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export type PostWriteProps = {};

type ParamsProps = {
  pathslug?: string;
};

function Write(props: PostWriteProps) {
  const { pathslug } = useParams<ParamsProps>();
  const [, setUpdateMode] = useUpdateModeState();
  const [, setUpdateTargetSlug] = useUpdateTargetSlugState();

  useEffect(() => {
    if (!pathslug) return;
    setUpdateMode(true);
    setUpdateTargetSlug(decodeParamSlash(pathslug));
  }, [pathslug, setUpdateMode, setUpdateTargetSlug]);

  return <WritePost />;
}

export default Write;
