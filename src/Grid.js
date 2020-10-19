import React, { useMemo } from 'react';
import { map } from 'ramda';

const columns = {
  Country: 'Country',
  Date: 'Date',
  NewConfirmed: 'New Confirmed',
  NewDeaths: 'New Deaths',
  NewRecovered: 'New Recovered',
  TotalConfirmed: 'Total Confirmed',
  TotalDeaths: 'Total Deaths',
  TotalRecovered: 'Total Recovered'
};

function Row ({ data }) {
  console.log({ data });
  return (
    <li>
      {Object.keys(columns).map(column => <span>{data[column] || ''}</span>)}
    </li>
  );
}
export default function Grid ({
  summary
}) {
  return (
    <>
      <ul>
        {Object.entries(columns).map(([key, name]) => (<li key={key}>{name}</li>))}
      </ul>
      <ul>
        {summary.map((row, index) => (<Row data={row} key={index} />))}
      </ul>
    </>
  );
}
