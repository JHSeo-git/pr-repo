import octokit from './octokit';
import { CreateIssuePayload } from './types';

export default async function createIssue({
  owner,
  repo,
  title,
  body,
  labels,
}: CreateIssuePayload) {
  const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner,
    repo,
    title,
    body,
    labels,
  });

  return response.data;
}
