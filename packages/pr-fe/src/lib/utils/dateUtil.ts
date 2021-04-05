import format from 'date-fns/format';

export function dateNowDefaultFormat() {
  return format(Date.now(), 'yyyyMMddHH24mmss');
}

export function dateFolderFormat(date: Date) {
  return format(date, 'yyyy-MM-dd');
}
