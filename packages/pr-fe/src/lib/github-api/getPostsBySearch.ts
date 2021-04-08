import octokit from './octokit';
import { GetPostsBySearchPayload } from './types';

export default async function getPostsBySearch({
  owner,
  repo,
  path,
  extension,
  perPage,
  page = 1,
}: GetPostsBySearchPayload) {
  const query = `repo:${owner}/${repo}+extension:${extension}+path:${path}`;
  const response = await octokit.request('GET /search/code', {
    q: query,
    per_page: perPage,
    page,
  });

  const data = response.data.items.map((item) => ({
    path: item.path,
  }));

  return {
    data,
    totalCount: response.data.total_count,
    nextPage: page + 1,
  };
}
