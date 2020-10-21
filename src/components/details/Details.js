import React, { useCallback } from 'react';
import { useHistory as useReactRouterHistory } from 'react-router-dom';
import { isNil } from 'ramda';
import './Details.css';
import { format } from 'date-fns';
import useHistory from '../history/useHistory';

const toDisplayName = (str = '') => {
  const [first, ...rest] = str;

  const restWithSpaces = rest
    .reduce((res, letter) =>
      letter === letter.toUpperCase()
        ? [...res, ' ', letter]
        : [...res, letter]
    );

  return [first, ...restWithSpaces].join('');
};

const dateFormat = 'PPpp';

function Details ({ details, country }) {
  const browserHistory = useReactRouterHistory();

  const { history, loadHistory } = useHistory();
  console.log({ history });

  const handleClick = useCallback(slug => e => {
    console.log({ slug });
    loadHistory(slug);
    browserHistory.push(`/history/${slug}`);
  }, []);

  // We still want this for place holder
  if (isNil(details)) return (<div id='details' />);

  const { Premium: _, Country, ...fields } = details;

  return (
    <div id='details'>
      <h1>Details</h1>
      <h2>{Country}</h2>
      {Object.entries(fields)
        .map(([column, value], index) => (
          <div className='row-details' key={index}>
            <span>{toDisplayName(column)}:</span>
            <b>{column === 'Date' ? format(Date.parse(value), dateFormat) : value}</b>
          </div>
        )
        )}
      <input id='history-button' type='button' value='history' onClick={handleClick(details.Slug)} />
    </div>
  );
}
export default Details;
