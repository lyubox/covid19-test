import React, { useMemo, useState, useCallback } from 'react';
import './Grid.css';
import { isNil, isEmpty, prop } from 'ramda';
import { useHistory, useLocation } from 'react-router-dom';
import Table from './Table';
import Fuse from 'fuse.js';
import { sortList } from '../../core';

const columns = {
  Country: 'Country',
  NewConfirmed: 'New Confirmed',
  NewDeaths: 'New Deaths',
  NewRecovered: 'New Recovered'
};

export default function Grid ({
  summary
}) {
  // use query-string if it gets more complicated
  const { search } = useLocation();
  const [, q] = search.split('=');
  // end query-string need

  const [query, setQuery] = useState(q || '');
  const [sort, setSort] = useState({ column: 'Country', assending: true });

  const history = useHistory();

  const fuse = useMemo(() => {
    return new Fuse(summary, {
      keys: ['Country'],
      threshold: 0.3
    });
  }, [summary]);

  // debounce mechanism here is a good idea
  const filteredList = useMemo(() => {
    if (isNil(fuse)) return summary;

    const newList = isEmpty(query)
      ? summary
      : fuse.search(query).map(prop('item'));

    return sortList(sort, newList);
  }, [query, summary, sort, fuse]);

  const handleClick = useCallback((index, slug, query) => () => {
    history.push(`/details/${slug}?q=${query}`);
  }, [history]);

  const handleSearch = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  const handleSort = useCallback(column => e => {
    setSort(oldSort =>
      column === oldSort.column
        ? { column, assending: !oldSort.assending }
        : { column, assending: true }
    );
  }, []);

  return (
    <div id='grid'>
      <div id='search'>
        <span>Search:</span>
        <input placeholder='Search for country' autoFocus onChange={handleSearch} type='text' value={query} />
      </div>
      <Table
        id='summary-table'
        columns={columns}
        list={filteredList}
        slugField='Slug'
        query={query}
        onClick={handleClick}
        onSort={handleSort}
        sort={sort}
      />
      {/*
      <div id='table-wrapper'>
        <table id='table-header'>
          <thead>
            <tr>
              {Object.entries(columns).map(([key, name]) =>
                (<th
                  className='headers'
                  key={key}
                  onClick={handleSort(key)}
                >
                  {name}
                  {sortSymbol(key, sort)}
                </th>))}
            </tr>
          </thead>
        </table>
        <div id='table-scroll'>
          <table id='data'>
            <tbody>
              {filteredList.map((row, index) =>
                (<Row
                  data={row}
                  key={index}
                  onClick={handleClick(index, row.Slug, query)}
                />)
              )}
            </tbody>
          </table>
        </div>
      </div>
      */}
    </div>
  );
}
