import octokit from './octokit';
import { CreateTreePayload } from './types';

export default async function createTree({
  owner,
  repo,
  tree,
}: CreateTreePayload) {
  const response = await octokit.request(
    'POST /repos/{owner}/{repo}/git/trees',
    {
      owner,
      repo,
      tree,
    }
  );

  return response.data;
}
