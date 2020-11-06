import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './History.css';
import useHistory from '../../state/useHistory';
import Table from '../Table';
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
  const [sort, setSort] = useState({ column: 'Date', ascending: false });

  const { historyState: { history = [], fetching, error }, loadHistory } = useHistory();

  useEffect(() => {
    if (!isNil(slug)) loadHistory(slug);
  }, [slug]);

  const handleSort = useCallback(column => e => {
    setSort(oldSort =>
      column === oldSort.column
        ? { column, ascending: !oldSort.ascending }
        : { column, ascending: true }
    );
  }, []);

  const handleClick = useCallback(e => {
    browserHistory.goBack();
  }, [browserHistory]);

  // Let's preformat the date and sort it.
  const list = useMemo(() => {
    if (isNil(history)) return [];

    const dateFormated = history.map(({ Date: dateText, ...rest }) =>
      ({ ...rest, Date: parseDate(dateText) }));

    return sortList(sort, dateFormated);
  }, [history, sort]);

  const country = useMemo(() => {
    const [first] = history;
    return isNil(first) ? '' : first.Country;
  }, [history]);

  return (
    <div id='history'>
      {/* Fansy loader here */}
      {fetching && <div className='loader'>Loading...</div>}
      <div>{error}</div>
      {fetching ||
        <div>
          <h1>{country}</h1>
          <Table
            id='history-table'
            columns={columns}
            list={list}
            onSort={handleSort}
            sort={sort}
          />
          <input history-testid='close-button' type='button' value='X' onClick={handleClick} />
        </div>}
    </div>
  );
}

export default React.memo(History);
