export const convertDWArrowToNewLine = (text: string) => {
  return text.replace(/\u21B5/g, '\n');
};

export const generateUrlSlug = (text: string) => {
  // 한글 unicode: /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g
  // default regex : /[0-9a-zA-Z. -]/g
  const invalidCharRegex = /[^0-9a-zA-Z.\u3131-\u314e\u314f-\u3163\uac00-\ud7a3 -]/g;
  return text
    .replace(invalidCharRegex, '')
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

const convertChar = '^';
export const encodeParamSlash = (path: string) =>
  path.replaceAll('/', convertChar);
export const decodeParamSlash = (decoded: string) =>
  decoded.replaceAll(convertChar, '/');

// https://github.com/velopert/velog-client/blob/e5a60cd539/src/lib/utils.ts#L25
export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};
