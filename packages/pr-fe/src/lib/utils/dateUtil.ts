import format from 'date-fns/format';

export function dateNowDefaultFormat() {
  return format(Date.now(), 'yyyyMMddHHmmss');
}

export function dateFolderFormat(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function dateFullFormat(date: Date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss.sss');
}
