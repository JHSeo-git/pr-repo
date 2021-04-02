import octokit from './octokit';
import { CreateBlobPayload } from './types';

export default async function createBlob({
  owner,
  repo,
  content,
}: CreateBlobPayload) {
  const response = await octokit.request(
    'POST /repos/{owner}/{repo}/git/blobs',
    {
      owner,
      repo,
      content,
    }
  );

  return response.data;
}
