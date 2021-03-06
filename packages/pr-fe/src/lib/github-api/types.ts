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

/**
 * The file mode;
 * 100644 for file (blob),
 * 100755 for executable (blob),
 * 040000 for subdirectory (tree),
 * 160000 for submodule (commit),
 * 120000
 * for a blob that specifies the path of a symlink.
 */
type GitTreeType = {
  path: string;
  mode: '100644' | '100755' | '040000' | '160000' | '120000';
  type: 'blob' | 'tree' | 'commit';
  sha: string;
};
export type CreateTreePayload = {
  tree: GitTreeType[];
  baseTree?: string;
} & GitPayload;

export type CreateCommitPayload = {
  message: string;
  treeSha: string;
} & GitPayload;

export type UpdateBranchPayload = {
  ref: string;
  sha: string;
  force?: boolean;
} & GitPayload;

export type MergeToMasterPayload = {
  head: string;
  base?: string;
} & GitPayload;

export type RemoveBranchPayload = {
  ref: string;
} & GitPayload;

export type GetMasterBranchPayload = {
  ref?: string;
} & GitPayload;

export type CreateIssuePayload = {
  title: string;
  body?: string;
  labels?: (
    | string
    | {
        id?: number | undefined;
        name?: string | undefined;
        description?: string | null | undefined;
        color?: string | null | undefined;
      }
  )[];
} & GitPayload;

export type GetPostPayload = {
  path: string;
} & GitPayload;

export type GetPostsByRecursivePayload = {
  ref?: string;
} & GitPayload;

export type GetPostsBySearchPayload = {
  path: string;
  extension: string;
  perPage: number;
  page?: number;
} & GitPayload;

export type CreateOrUpdateContentPayload = {
  path: string;
  message: string;
  content: string;
  branch?: string;
} & GitPayload;

// Generated by https://quicktype.io

export type FileTypePost = {
  type: string;
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: {
    git: string | null;
    html: string | null;
    self: string;
  };
  target?: string;
  submodule_git_url?: string;
};
