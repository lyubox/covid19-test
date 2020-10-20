import React, { useEffect, useMemo, useState, useCallback } from 'react';
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

function Row ({ data, selected, onClick }) {
  const slug = data.Slug;
  const [country, ...rest] = Object.keys(columns);
  return (
    <tr
      className={selected ? 'selectedRow' : 'row'}
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
  // -1 means not selected
  const [selected, setSelected] = useState(-1);

  const history = useHistory();

  const fuse = useMemo(() => {
    return new Fuse(summary, {
      keys: ['Country'],
      threshold: 0.3
    });
  }, [summary]);

  // debounce mechanism here is a good idea
  const filteredList = useMemo(() => {
    console.log({ query });
    if (isNil(fuse) || isEmpty(query)) return summary;

    // if no key has been pressed, no need to set it up, otherwise reset it to 0
    setSelected(old => old === -1 ? -1 : 0);

    return fuse.search(query).map(prop('item'));
  }, [query, summary]);

  const handleClick = useCallback((index, slug) => () => {
  //  history.push(`/details/${slug}`);
    setSelected(index);
  }, []);

  const handleSearch = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  const handleKeyPress = useCallback(e => {
    const { key } = e;

    const actions = {
      ArrowUp: () => setSelected(oldSelected =>
        oldSelected <= 0
          ? 0
          : oldSelected - 1
      ),
      ArrowDown: () => setSelected(oldSelected =>
        oldSelected === filteredList.length - 1 && oldSelected !== -1
          ? oldSelected
          : oldSelected + 1
      )
    };

    if (key === 'ArrowUp' || key === 'ArrowDown') e.preventDefault();

    const actionFn = actions[key];

    if (!isNil(actionFn)) actionFn();
  }, [filteredList]);

  useEffect(() => {
    if (isEmpty(filteredList)) return;

    const curr = filteredList[selected];

    if (!isNil(curr?.Slug)) {
      history.push(`/details/${curr?.Slug}`);
    }
  }, [selected, filteredList]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    // clean up
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [filteredList]);

  console.log({ filteredList });
  console.log({ selected });

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
            selected={index === selected}
          />
          ))}
      </table>
    </>
  );
}
