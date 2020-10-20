import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './History.css';

function History () {
  const history = useHistory();

  const handleClick = useCallback(e => {
    history.goBack();
  }, []);

  return (
    <div id='history'>
      Test history
      <input type='button' value='Cancel' onClick={handleClick} />
    </div>
  );
}

export default History;
