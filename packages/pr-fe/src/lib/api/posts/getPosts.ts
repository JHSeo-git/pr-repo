import client from '@src/lib/api/client';
import { Post } from './types';

export async function getPosts() {
  // TODO: remove
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('complete');
      resolve('complete');
    }, 2000);
  });
  const response = await client.get<Post[]>('/posts');
  return response.data;
}
