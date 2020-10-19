import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import useSummary from './useSummary';
import Grid from './Grid';

function List () {
  const { path, url } = useRouteMatch();
  const { country } = useParams();

  const { summary } = useSummary();

  console.log({ summary });

  console.log({ path, url, country });

  return (
    <div>
      <h1>Welcom to Covid19 Stats</h1>
      <div>
        Global stats data
      </div>
      <Grid summary={summary} />
    </div>
  );
}

export default List;
