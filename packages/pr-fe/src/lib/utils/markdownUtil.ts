import matter from 'gray-matter';
import { decode } from 'js-base64';
import { FrontMatterType, PostWithFrontmatterType } from '../types/post';
import { dateFullFormat } from './dateUtil';

export const makeContentWithFrontmatter = ({
  title,
  short_description,
  thumbnail,
  body,
  date,
  user,
  category,
}: PostWithFrontmatterType) => {
  return matter.stringify(body, {
    title,
    short_description,
    thumbnail,
    date: dateFullFormat(date),
    user: user ?? '',
    category: category?.join(','),
  });
};

export const parseFrontmatterOfContent = (markdown: string) => {
  const { data, content } = matter(decodeBase64(markdown));

  const frontmatter: FrontMatterType = {
    title: data['title'],
    short_description: data['short_description'] ?? null,
    thumbnail: data['thumbnail'] ?? null,
    date: new Date(data['date']) ?? null,
    user: data['user'],
    category: data['category'] ? data['category'].split(',') : null,
  };
  return {
    frontmatter,
    content,
  };
};

export const decodeBase64 = (content: string) => {
  return decode(content);
};
