import { useMemo, useCallback } from 'react';
import useStore from './store';
import { getSummary } from '../service';

export default function useSummary () {
  const { state, editState } = useStore();

  const edit = editState('country');
  const countryState = useMemo(() => state.country, [state.country]);

  const request = useCallback(() => {
    console.log('Request');
    edit({ fetching: true });
  }, [edit]);

  const success = useCallback((summary) => {
    console.log('Success');
    edit({
      summary,
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
