import octokit from './octokit';
import { UpdateBranchPayload } from './types';

export default async function updateBranch({
  owner,
  repo,
  ref,
  sha,
  force = false,
}: UpdateBranchPayload) {
  const response = await octokit.request(
    'PATCH /repos/{owner}/{repo}/git/refs/{ref}',
    {
      owner,
      repo,
      ref: `heads/${ref}`,
      sha,
      force,
    }
  );

  return response.status;
}
