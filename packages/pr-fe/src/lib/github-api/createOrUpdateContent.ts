import octokit from './octokit';
import { CreateOrUpdateContentPayload } from './types';

export default async function createOrUpdateContent({
  owner,
  repo,
  path,
  message,
  content,
  branch = 'master',
}: CreateOrUpdateContentPayload) {
  const response = await octokit.request(
    'PUT /repos/{owner}/{repo}/contents/{path}',
    {
      owner,
      repo,
      path,
      message,
      content,
      branch,
    }
  );

  return response.data;
}
