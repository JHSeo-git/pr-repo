import * as matter from 'gray-matter';
import { dateFolderFormat } from './dateUtil';

type MakeFrontmatterProps = {
  title: string;
  body: string;
  date: Date;
  user?: string;
  category?: string[];
};

export const makeContentWithFrontmatter = ({
  title,
  body,
  date,
  user,
  category,
}: MakeFrontmatterProps) => {
  return matter.stringify(body, {
    title,
    date: dateFolderFormat(date),
    user: user ?? '',
    category: category?.join(','),
  });
};
