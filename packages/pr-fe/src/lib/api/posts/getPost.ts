import client from '@src/lib/api/client';
import { Post } from './types';

export async function getPost(id: number) {
  const response = await client.get<Post>(`/post/${id}`);
  return response.data;
}
