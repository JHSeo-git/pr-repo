import octokit from './octokit';
import { CreateBranchPayload } from './types';

export default async function createBranchRef({
  owner,
  repo,
  ref,
  sha,
}: CreateBranchPayload) {
  const response = await octokit.request(
    'POST /repos/{owner}/{repo}/git/refs',
    {
      owner,
      repo,
      ref: `refs/heads/${ref}`,
      sha,
    }
  );

  // TODO: serialize
  return response.data;
}
