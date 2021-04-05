import octokit from './octokit';
import { GetMasterBranchPayload } from './types';

export default async function getMasterBranch({
  owner,
  repo,
  ref = 'master',
}: GetMasterBranchPayload) {
  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    {
      owner,
      repo,
      ref: `heads/${ref}`,
    }
  );

  return response.data;
}
