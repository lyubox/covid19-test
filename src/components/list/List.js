import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { indexBy, prop, isNil } from 'ramda';
import useSummary from './useSummary';
import Grid from '../grid/Grid';
import Details from '../details/Details';
import History from '../history/History';

import './List.css';

function List () {
  const { module, country } = useParams();

  const [isBtnClicked, setBtnClicked] = useState(!isNil(module));

  const { summary } = useSummary();
  const history = useHistory();

  const location = useLocation();

  const summaryBySlug = useMemo(() =>
    indexBy(prop('Slug'))(summary)
  , [summary]);

  const showHistory = module === 'history';

  const handleClick = useCallback(e => {
    setBtnClicked(true);
  }, []);

  return (
    <div id='wrapper'>
      <div id='header'>
        <h1>Welcome to Covid19 Stats</h1>
      </div>
      {!isBtnClicked &&
        <div id='buttonContainer'>
          <input id='header-button' type='button' value='Get Started' onClick={handleClick} />
        </div>}
      {isBtnClicked &&
        <div id='list-wrapper'>
          <Grid
            summary={summary}
            location={location}
          />
          <Details
            details={summaryBySlug[country]}
            history={history}
          />
          {showHistory &&
            <History
              slug={country}
              history={history}
            />}
        </div>}
    </div>
  );
}

export default List;
