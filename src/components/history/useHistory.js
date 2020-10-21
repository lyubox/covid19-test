import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { historyState } from '../../redux/selectors';
import { loadHistory as loadHistoryAction } from '../../redux/actions';

export default function useHistory () {
  const dispatch = useDispatch();

  const loadHistory = useCallback(country => {
    console.log({ country });
    dispatch(loadHistoryAction(country));
  }, []);

  const history = useSelector(historyState);

  return {
    history,
    loadHistory
  };
}
