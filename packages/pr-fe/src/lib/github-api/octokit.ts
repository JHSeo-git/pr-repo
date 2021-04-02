import { Octokit } from '@octokit/core';

const { REACT_APP_GITHUB_TOKEN: token } = process.env;

const octokit = new Octokit({
  auth: token,
});
export default octokit;
