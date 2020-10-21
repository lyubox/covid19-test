import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Table from './Table';

describe('Table', () => {
  const list = [
    { col1: 1, col2: 2, col3: 3 },
    { col1: 2, col2: 4, col3: 4 },
    { col1: 3, col2: 5555, col3: 5 }
  ];

  const columns = {
    col1: 'Column One',
    col2: 'Column Two'
  };

  const query = 'test';

  const sortFnMock = jest.fn();
  const clickFnMock = jest.fn();
  const onSort = col => () => sortFnMock(col);
  const onClick = (index, slug, query) => () => clickFnMock(index, slug, query);

  const sort = { column: 'col1', assending: true };

  beforeEach(() => {
    sortFnMock.mockClear();
    clickFnMock.mockClear();
  });

  test('Shows data', () => {
    render(
      <Table
        id='test'
        columns={columns}
        list={list}
        slugField='col2'
        query={query}
        onSort={onSort}
        onClick={onClick}
        sort={sort}
      />
    );

    // initialy this is sorted
    const firstColumn = screen.getByText('Column One▼');
    screen.getByText('Column Two');

    fireEvent.click(firstColumn);

    // one of the rows
    const row = screen.getByText('5555');
    fireEvent.click(row);

    const [[col]] = sortFnMock.mock.calls;
    expect(col).toBe('col1');

    const [[index, slug, queryText]] = clickFnMock.mock.calls;
    expect(index).toBe(2);
    expect(slug).toBe(5555);
    expect(queryText).toBe('test');
  });
});
