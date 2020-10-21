import { isNil, sortBy, prop } from 'ramda';

export const sortSymbol = (column, sort) =>
  column !== sort.column
    ? ''
    : sort.assending ? '▼' : '▲';

export const parseDate = (dateText) => {
  const [date] = dateText.split('T');

  return isNil(date)
    ? ''
    : date;
};

export const sortList = ({ column, assending }, list = []) =>
  assending
    ? sortBy(prop(column))(list)
    : sortBy(prop(column))(list).reverse();
