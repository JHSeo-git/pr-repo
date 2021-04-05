import octokit from './octokit';
import { GetPostsPaylod } from './types';

export default async function getPosts({
  owner,
  repo,
  path = 'posts',
}: GetPostsPaylod) {
  const request = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner,
      repo,
      path,
    }
  );

  return request.data;
}
