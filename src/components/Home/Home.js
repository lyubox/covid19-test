import React, { useMemo, useCallback } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { indexBy, prop, isEmpty } from 'ramda';
import useSummary from '../../state/useSummary';
import Grid from '../Grid';
import Details from '../Details';
import History from '../History';

import './Home.css';

function Home () {
  const { module, country } = useParams();

  const { countryState, loadSummaryList } = useSummary();
  const { summary, fetching, error } = countryState;
  const { Countries = [] } = summary;

  const history = useHistory();

  const location = useLocation();

  const summaryBySlug = useMemo(
    () => indexBy(prop('Slug'))(Countries)
    , [Countries]);

  const showHistory = module === 'history';

  const handleClick = useCallback((e) => {
    // setBtnClicked(true);
    loadSummaryList();
  }, [loadSummaryList]);

  return (
    <div id='wrapper'>
      <div id='header'>
        <h1>Welcome to Covid19 Stats</h1>
      </div>
      {isEmpty(error) && (
        <div className='error'>{error}</div>
      )}
      {Countries.length === 0 && (
        <div id='buttonContainer'>
          <input
            id='header-button'
            type='button'
            value={fetching ? 'Loading...' : 'Get Started'}
            onClick={handleClick}
          />
        </div>
      )}
      {Countries.length > 0 && (
        <div id='list-wrapper'>
          <Grid summary={Countries} location={location} />
          <Details details={summaryBySlug[country]} history={history} />
          {showHistory && <History slug={country} history={history} />}
        </div>
      )}
    </div>
  );
}

export default Home;
