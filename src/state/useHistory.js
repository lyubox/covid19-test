import { useMemo, useCallback } from 'react';
import useStore from './store';
import { getHistory } from '../service';

export default function useHistoryState () {
  const { state, setState } = useStore();

  const historyState = useMemo(() => state.history, [state.history]);

  const request = useCallback(() => {
    console.log('Request');

    setState((old) => ({
      ...old,
      history: {
        ...historyState,
        fetching: true
      }
    }));
  }, [historyState, setState]);

  const success = useCallback((history) => {
    console.log('Success');
    setState((old) => ({
      ...old,
      history: {
        ...historyState,
        history,
        fetching: false
      }
    }));
  }, [historyState, setState]);

  const failure = useCallback((error) => {
    console.log('Failure');
    setState((old) => ({
      ...old,
      history: {
        ...historyState,
        error,
        fetching: false
      }
    }));
  }, [historyState, setState]);

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
