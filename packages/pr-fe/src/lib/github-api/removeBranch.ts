import octokit from './octokit';
import { RemoveBranchPayload } from './types';

export default async function removeBranch({
  owner,
  repo,
  ref,
}: RemoveBranchPayload) {
  const response = await octokit.request(
    'DELETE /repos/{owner}/{repo}/git/refs/{ref}',
    {
      owner,
      repo,
      ref: `heads/${ref}`,
    }
  );

  return response.status;
}
