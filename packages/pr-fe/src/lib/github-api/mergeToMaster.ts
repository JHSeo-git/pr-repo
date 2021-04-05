import octokit from './octokit';
import { MergeToMasterPayload } from './types';

export default async function mergeToMaster({
  owner,
  repo,
  head,
  base = 'master',
}: MergeToMasterPayload) {
  const response = await octokit.request('POST /repos/{owner}/{repo}/merges', {
    owner,
    repo,
    base,
    head,
  });

  return response.data;
}
