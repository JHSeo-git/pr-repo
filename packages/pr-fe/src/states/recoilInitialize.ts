import { MutableSnapshot } from 'recoil';
import { githubAPIState } from './githubAPIstates';

const recoilInitialize = ({ set }: MutableSnapshot) => {
  const {
    REACT_APP_GITHUB_REPO,
    REACT_APP_GITHUB_OWNER,
    REACT_APP_GITHUB_MASTER,
  } = process.env;

  set(githubAPIState, {
    owner: REACT_APP_GITHUB_OWNER,
    repo: REACT_APP_GITHUB_REPO,
    master: REACT_APP_GITHUB_MASTER,
  });
};

export default recoilInitialize;
