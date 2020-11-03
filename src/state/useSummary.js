import { useMemo, useCallback } from 'react';
import useStore from './store';
import { getSummary } from '../service';

export default function useSummary () {
  const { state, setState } = useStore();

  const countryState = useMemo(() => state.country, [state.country]);

  const request = useCallback(() => {
    console.log('Request');

    setState((old) => ({
      ...old,
      country: {
        ...countryState,
        fetching: true
      }
    }));
  }, [countryState, setState]);

  const success = useCallback((summary) => {
    console.log('Success');
    setState((old) => ({
      ...old,
      country: {
        ...countryState,
        summary,
        fetching: false
      }
    }));
  }, [countryState, setState]);

  const failure = useCallback((error) => {
    console.log('Failure');
    setState((old) => ({
      ...old,
      country: {
        ...countryState,
        error,
        fetching: false
      }
    }));
  }, [countryState, setState]);

  const loadSummaryList = useCallback(() => {
    request();

    return getSummary()
      .then((summary) => success(summary))
      .catch((error) => {
        console.log('Load Summery Error', error);
        failure('There was a problem loading the summary list');
      });
  }, [request, success, failure]);

  return {
    loadSummaryList,
    countryState
  };
}
