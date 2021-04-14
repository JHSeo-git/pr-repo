import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type GithubAPIType = {
  owner?: string;
  repo?: string;
  master?: string;
  postPath?: string;
  githubUrlImagePrefix?: string;
};
export const githubAPIState = atom<GithubAPIType>({
  key: 'githubAPIState',
  default: {
    owner: undefined,
    repo: undefined,
    master: undefined,
    postPath: undefined,
    githubUrlImagePrefix: undefined,
  },
});

export function useGithubAPIValue() {
  return useRecoilValue(githubAPIState);
}

export function useSetGithubAPI() {
  return useSetRecoilState(githubAPIState);
}
