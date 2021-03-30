import { css } from '@emotion/react';
import { Post } from '@src/lib/api/posts/types';
import palette from '@src/lib/styles/palette';

export type PostItemProps = {
  post: Post;
};

function PostItem({ post }: PostItemProps) {
  return (
    <li css={itemStyle}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </li>
  );
}

const itemStyle = css`
  min-height: 10rem;
  padding: 1rem;
  border-radius: 0.1875rem;
  cursor: pointer;
  box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.11),
    0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.22),
      0 0.4375rem 0.625rem rgba(0, 0, 0, 0.12);
  }
  &:active {
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.17),
      0 0.25rem 0.3125rem rgba(0, 0, 0, 0.11);
  }

  & + & {
    margin-top: 1.5rem;
  }

  h2 {
    margin: 0;
    padding: 0;
    color: ${palette.blueGrey[900]};
  }
  p {
    margin: 0;
    padding: 0;
    margin-top: 1rem;
    color: ${palette.blueGrey[700]};
  }
`;

export default PostItem;
