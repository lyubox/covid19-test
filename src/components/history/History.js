import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './History.css';
import useHistory from './useHistory';
import Table from '../grid/Table';
import { isNil } from 'ramda';
import { parseDate, sortList } from '../../core';

const columns = {
  Date: 'Date',
  Confirmed: 'Confirmed',
  Deaths: 'Deaths',
  Recovered: 'Recovered',
  Active: 'Active'
};

function History ({ slug, history: browserHistory }) {
  // More reicent recards are better.
  const [sort, setSort] = useState({ column: 'Date', assending: false });

  const { history: { data = [], historyFetching, error }, loadHistory } = useHistory();

  useEffect(() => {
    if (!isNil(slug)) loadHistory(slug);
  }, [slug, loadHistory]);

  const handleSort = useCallback(column => e => {
    setSort(oldSort =>
      column === oldSort.column
        ? { column, assending: !oldSort.assending }
        : { column, assending: true }
    );
  }, []);

  const handleClick = useCallback(e => {
    browserHistory.goBack();
  }, [browserHistory]);

  // Let's preformat the date and sort it.
  const list = useMemo(() => {
    if (isNil(data)) return [];

    const dateFormated = data.map(({ Date: dateText, ...rest }) =>
      ({ ...rest, Date: parseDate(dateText) }));

    return sortList(sort, dateFormated);
  }, [data, sort]);

  const country = useMemo(() => {
    const [first] = data;
    return isNil(first) ? '' : first.Country;
  }, [data]);

  return (
    <div id='history'>
      {/* Fansy loader here */}
      {historyFetching && <div className='loader'>Loading...</div>}
      <div>{error}</div>
      {historyFetching ||
        <div>
          <h1>{country}</h1>
          <Table
            id='history-table'
            columns={columns}
            list={list}
            onSort={handleSort}
            sort={sort}
          />
          <input data-testid='close-button' type='button' value='X' onClick={handleClick} />
        </div>}
    </div>
  );
}

export default History;
