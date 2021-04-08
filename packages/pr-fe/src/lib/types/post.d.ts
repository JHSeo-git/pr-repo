export type FrontMatterType = {
  title: string;
  short_description: string;
  date: Date;
  user?: string;
  category?: string[];
};

export type PostWithFrontmatterType = {
  body: string;
  path?: string;
} & FrontMatterType;
