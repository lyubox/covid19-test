import { isNil, sortBy, prop } from 'ramda';

export const sortSymbol = (column, sort) =>
  column !== sort.column
    ? ''
    : sort.ascending ? '▼' : '▲';

export const parseDate = (dateText = '') => {
  const [date] = dateText.split('T');

  return date;
};

export const sortList = ({ column, ascending }, list = []) =>
  ascending
    ? sortBy(prop(column))(list)
    : sortBy(prop(column))(list).reverse();
