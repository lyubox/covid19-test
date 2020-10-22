import { sortSymbol, parseDate, sortList } from './core';
import { prop } from 'ramda';

describe('core', () => {
  const sortAsc = { column: 'col1', ascending: true };
  const sortDesc = { column: 'col1', ascending: false };
  const sortDiffCol = { column: 'col2', ascending: true };

  const list = [
    { col1: 1, col2: 2 },
    { col1: 2, col2: 4 },
    { col1: 4, col2: 6 },
    { col1: 3, col2: 2 }
  ];

  test('sortSymbol', () => {
    expect(sortSymbol('col1', sortAsc)).toBe('▼');
    expect(sortSymbol('col1', sortDesc)).toBe('▲');
    expect(sortSymbol('col1', sortDiffCol)).toBe('');
  });

  test('parseDate', () => {
    expect(parseDate('2020-10-20T12:00')).toBe('2020-10-20');
    expect(parseDate('2020-10-20')).toBe('2020-10-20');
    expect(parseDate(undefined)).toBe('');
  });

  test('sortList', () => {
    expect(sortList(sortAsc, list).map(prop('col1'))).toEqual([1, 2, 3, 4]);
    expect(sortList(sortDesc, list).map(prop('col1'))).toEqual([4, 3, 2, 1]);
    expect(sortList(sortDiffCol, list).map(prop('col2'))).toEqual([2, 2, 4, 6]);
  });
});
