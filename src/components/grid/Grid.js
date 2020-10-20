import React, { useMemo, useState, useCallback } from 'react';
import './Grid.css';
import { isNil, isEmpty, prop } from 'ramda';
import { Link, useHistory } from 'react-router-dom';
import Fuse from 'fuse.js';

const columns = {
  Country: 'Country',
  NewConfirmed: 'New Confirmed',
  NewDeaths: 'New Deaths',
  NewRecovered: 'New Recovered'
};

function Row ({ data, onClick }) {
  const slug = data.Slug;
  const [country, ...rest] = Object.keys(columns);
  return (
    <tr
      onClick={onClick}
    >
      <td>
        <Link to={`/details/${slug}`}>
          {data[country]}
        </Link>
      </td>
      {rest.map((column, index) => <td key={index}>{data[column] || ''}</td>)}
    </tr>
  );
}

export default function Grid ({
  summary
}) {
  const [query, setQuery] = useState('');

  const history = useHistory();

  const fuse = useMemo(() => {
    return new Fuse(summary, {
      keys: ['Country'],
      threshold: 0.3
    });
  }, [summary]);

  // debounce mechanism here is a good idea
  const filteredList = useMemo(() => {
    if (isNil(fuse) || isEmpty(query)) return summary;

    return fuse.search(query).map(prop('item'));
  }, [query, summary]);

  const handleClick = useCallback((index, slug) => () => {
    history.push(`/details/${slug}`);
  }, []);

  const handleSearch = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  return (
    <>
      <div>
        Search:<input plaseholder='Search for country' autoFocus onChange={handleSearch} type='text' value={query} />
      </div>
      <table className='table'>
        <tr>
          {Object.entries(columns).map(([key, name]) => (<th key={key}>{name}</th>))}
        </tr>
        {filteredList.map((row, index) =>
          (<Row
            data={row}
            key={index}
            onClick={handleClick(index, row.Slug)}
          />)
        )}
      </table>
    </>
  );
}
