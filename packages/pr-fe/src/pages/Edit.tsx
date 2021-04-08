import EditPost from '@src/components/EditPost';
import { decodeParamSlash } from '@src/lib/utils/common';
import { useParams } from 'react-router';

export type EditProps = {};

type ParamsProps = {
  pathslug?: string;
};

function Edit(props: EditProps) {
  const { pathslug } = useParams<ParamsProps>();

  if (!pathslug) return null;

  return <EditPost path={decodeParamSlash(pathslug)} />;
}

export default Edit;
