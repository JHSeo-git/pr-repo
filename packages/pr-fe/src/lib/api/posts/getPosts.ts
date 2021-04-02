import client from '@src/lib/api/client';
import { Post } from './types';

export async function getPosts() {
  const response = await client.get<Post[]>('/posts');
  return response.data;
}
