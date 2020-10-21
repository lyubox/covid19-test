import React, { useCallback } from 'react';
import { useHistory as useReactRouterHistory } from 'react-router-dom';
import './History.css';
import useHistory from './useHistory';

function History () {
  const browserHistory = useReactRouterHistory();
  const { history: { data, historyFetching, error } } = useHistory();

  const handleClick = useCallback(e => {
    browserHistory.goBack();
  }, []);

  return (
    <div id='history'>
      <div>{error}</div>
      <div />
      <input type='button' value='Cancel' onClick={handleClick} />
    </div>
  );
}

export default History;
