import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { isNil } from 'ramda';

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
  const history = useHistory();

  const handleClick = useCallback(e => {
    history.push(`/history/${details.Slug}`);
  }, [details]);

  if (isNil(details)) return null;

  const { Premium: _, ...fields } = details;

  return (
    <>
      {Object.entries(fields)
        .map(([column, value], index) => (
          <div key={index}>
            <b>{toDisplayName(column)}:</b>
            <span>{value}</span>
          </div>
        )
        )}
      <input type='button' value='history' onClick={handleClick} />
    </>
  );
}
export default Details;
