import octokit from './octokit';
import { CreateCommitPayload } from './types';

export default async function createCommit({
  owner,
  repo,
  message,
  treeSha,
}: CreateCommitPayload) {
  const response = await octokit.request(
    'POST /repos/{owner}/{repo}/git/commits',
    {
      owner,
      repo,
      message,
      tree: treeSha,
    }
  );

  return response.data;
}
