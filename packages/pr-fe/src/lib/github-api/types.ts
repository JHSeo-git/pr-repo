type GitPayload = {
  owner: string;
  repo: string;
};

export type GetRepositoryPayload = GitPayload;

export type CreateBranchPayload = {
  ref: string;
  sha: string;
} & GitPayload;

export type CreateBlobPayload = {
  content: string;
} & GitPayload;
