import { promises as fsPromise } from 'fs';

export function writePost(savePath: string, content: string) {
  return fsPromise.writeFile(savePath, content);
}
