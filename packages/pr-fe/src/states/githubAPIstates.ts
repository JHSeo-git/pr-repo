import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type GithubAPIType = {
  owner?: string;
  repo?: string;
  master?: string;
};
export const githubAPIState = atom<GithubAPIType>({
  key: 'githubAPIState',
  default: {
    owner: undefined,
    repo: undefined,
    master: undefined,
  },
});

export function useGithubAPIValue() {
  return useRecoilValue(githubAPIState);
}

export function useSetGithubAPI() {
  return useSetRecoilState(githubAPIState);
}