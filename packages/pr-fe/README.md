- craco
- emotion
- recoil
- @toast-ui/editor
- react-query
- axios
- @octokit/core

## github api

- repository: https://docs.github.com/en/rest/reference/repos
- branch: https://docs.github.com/en/rest/reference/git#refs

0. get master branch for sha
1. create new-branch ref
2. create blob
3. create tree <- blob
4. create commit <- tree
5. update new-branch ref <- commit
6. merge to master <- new-branch
7. remove new-branch ref

## else...

- By default, "inactive" queries are garbage collected after 5 minutes.
