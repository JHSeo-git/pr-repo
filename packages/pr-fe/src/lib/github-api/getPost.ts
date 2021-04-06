import octokit from './octokit';
import { FileTypePost, GetPostPayload } from './types';

export default async function getPost({ owner, repo, path }: GetPostPayload) {
  const request = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      headers: { accept: 'application/vnd.github.v3+json' },
      owner,
      repo,
      path,
    }
  );

  return request.data as FileTypePost;
}
