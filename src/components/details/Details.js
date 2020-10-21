import React, { useCallback } from 'react';
import { useHistory as useReactRouterHistory } from 'react-router-dom';
import { isNil } from 'ramda';
import './Details.css';

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

function Details ({ details, country }) {
  const browserHistory = useReactRouterHistory();

  const handleClick = useCallback(slug => e => {
    browserHistory.push(`/history/${slug}`);
  }, [browserHistory]);

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
            <b>{column === 'Date' ? value.split('T')[0] : value}</b>{/* ugly */}
          </div>
        )
        )}
      <input id='history-button' type='button' value='history' onClick={handleClick(details.Slug)} />
    </div>
  );
}
export default Details;
