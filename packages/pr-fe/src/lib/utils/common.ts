import format from 'date-fns/format';

export function dateNowDefaultFormat() {
  return format(Date.now(), 'yyyyMMddHH24mmss');
}

export function dateFolderFormat(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function convertDWArrowToNewLine(text: string) {
  return text.replace(/\u21B5/g, '\n');
}

export const generateUrlSlug = (text: string) => {
  // 한글 unicode: /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g
  // default regex : /[0-9a-zA-Z. -]/g
  const invalidCharRegex = /[^0-9a-zA-Z.\u3131-\u314e\u314f-\u3163\uac00-\ud7a3 -]/g;
  return text
    .replace(invalidCharRegex, '')
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};
