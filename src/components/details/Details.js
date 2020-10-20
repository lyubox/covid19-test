import React from 'react';
import { isNil } from 'ramda';

const toDisplayName = (str = '') => {
  const [first, ...rest] = str;
  console.log({ rest });

  const restWithSpaces = rest
    .reduce((res, letter) =>
      letter === letter.toUpperCase()
        ? [...res, ' ', letter]
        : [...res, letter]
    );

  return [first, ...restWithSpaces].join('');
};

function Details ({ details, country }) {
  if (isNil(details)) return null;
  console.log({ details });
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
      <input type='button' value='history' />
    </>
  );
}
export default Details;
