import React, { useState, useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { indexBy, prop } from 'ramda';
import useSummary from './useSummary';
import Grid from '../grid/Grid';
import Details from '../details/Details';

function List () {
  const { path, url } = useRouteMatch();
  const { country } = useParams();

  const { summary } = useSummary();

  const summaryBySlug = indexBy(prop('Slug'))(summary);

  console.log({ summary });

  console.log({ path, url, country });

  // first element is empty
  const [_, module] = path.split('/');
  const showDetails = module === 'details' || module === 'history';
  const showHistory = module === 'history';
  console.log({ showDetails, module, split: path.split('/') });

  return (
    <div>
      <h1>Welcom to Covid19 Stats</h1>
      <div>
        Global stats data
      </div>
      <Grid summary={summary} />
      {showDetails
        ? <Details details={summaryBySlug[country]} />
        : null}
    </div>
  );
}

export default List;
