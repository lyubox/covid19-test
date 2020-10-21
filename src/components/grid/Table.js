import React from 'react';
import './Table.css';
import { prop, isNil } from 'ramda';
import { sortSymbol } from '../../core';

function Row ({ columns, data, onClick }) {
  const [country, ...rest] = Object.keys(columns);
  return (
    <tr
      onClick={onClick}
    >
      <td className='leftAligned'>
        {data[country]}
      </td>
      {rest.map((column, index) => <td className='rightAligned' key={index}>{data[column] || ''}</td>)}
    </tr>
  );
}

function Table ({
  id,
  columns,
  list,
  slugField = 'Slug',
  query,
  onSort,
  onClick,
  sort
}) {
  return (
    <div id={id} className='table-wrapper'>
      <table className='table-header'>
        <thead>
          <tr>
            {Object.entries(columns).map(([key, name]) =>
              (<th
                className='headers'
                key={key}
                onClick={onSort(key)}
              >
                {name}
                {sortSymbol(key, sort)}
              </th>))}
          </tr>
        </thead>
      </table>
      <div className='table-scroll'>
        <table className='data'>
          <tbody>
            {list.map((row, index) =>
              (<Row
                data={row}
                key={index}
                onClick={!isNil(onClick) ? onClick(index, prop(slugField, row), query) : null}
                columns={columns}
              />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
