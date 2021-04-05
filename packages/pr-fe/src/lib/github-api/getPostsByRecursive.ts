import octokit from './octokit';
import { GetPostsByRecursivePayload } from './types';

export default async function getPostsByRecursive({
  owner,
  repo,
  ref = 'master',
}: GetPostsByRecursivePayload) {
  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/git/trees/{tree_sha}',
    {
      owner,
      repo,
      tree_sha: ref,
      recursive: '1',
    }
  );

  const data = response.data.tree
    .filter((item) => item.path?.startsWith('posts/') && item.type === 'blob')
    .map((item) => item);

  return data;
}
