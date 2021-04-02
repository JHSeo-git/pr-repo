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
} & GitPayload;
