import { useMemo, useCallback } from 'react';
import useStore from './store';
import { getHistory } from '../service';

export default function useHistoryState () {
  const { state, editState } = useStore();

  const edit = editState('history');
  const historyState = useMemo(() => state.history, [state.history]);

  const request = useCallback(() => {
    console.log('Request');
    edit({ fetching: true });
  }, [edit]);

  const success = useCallback((history) => {
    console.log('Success');
    edit({
      history,
      fetching: false
    });
  }, [edit]);

  const failure = useCallback((error) => {
    console.log('Failure');
    edit({
      error,
      fetching: false
    });
  }, [edit]);

  const loadHistory = useCallback((slug) => {
    request();

    return getHistory(slug)
      .then((history) => success(history))
      .catch((error) => {
        console.log('Load History Error', error);
        failure('There was a problem loading the history list');
      });
  }, [request, success, failure]);

  return {
    loadHistory,
    historyState
  };
}
