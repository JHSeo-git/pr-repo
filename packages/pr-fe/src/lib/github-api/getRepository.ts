import octokit from './octokit';
import { GetRepositoryPayload } from './types';

export default async function getRepository({
  repo,
  owner,
}: GetRepositoryPayload) {
  const response = await octokit.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });

  // TODO: serialize;
  return response.data;
}
