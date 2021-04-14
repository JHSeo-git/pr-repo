import { MutableSnapshot } from 'recoil';
import { githubAPIState } from './githubAPIstates';

const recoilInitialize = ({ set }: MutableSnapshot) => {
  const {
    REACT_APP_GITHUB_REPO,
    REACT_APP_GITHUB_OWNER,
    REACT_APP_GITHUB_MASTER,
    REACT_APP_GITHUB_POST_PATH,
    REACT_APP_GITHUB_IMAGE_PREFIX,
  } = process.env;

  set(githubAPIState, {
    owner: REACT_APP_GITHUB_OWNER,
    repo: REACT_APP_GITHUB_REPO,
    master: REACT_APP_GITHUB_MASTER,
    postPath: REACT_APP_GITHUB_POST_PATH,
    githubUrlImagePrefix: REACT_APP_GITHUB_IMAGE_PREFIX,
  });
};

export default recoilInitialize;
