import useStore from './store';
import { getSummary } from '../service';

export const countryInitState = {
  sumary: [],
  fetching: false,
  error: ''
};

export default function actions () {
  const [state, setState] = useStore();

  const request = () => {
    setState((old) => ({
      ...old,
      fetching: true
    }));
  };
  const success = (sumary) => {
    useStore((old) => ({
      ...old,
      fetching: false,
      sumary
    }));
  };
  const failure = (error) => {
    useStore((old) => ({
      ...old,
      fetching: false,
      error
    }));
  };

  const loadSummaryList = () => {
    request();

    return getSummary()
      .then((summary) => success(summary))
      .catch((error) => {
        console.log('Load Summery Error', error);
        failure('There was a problem loading the summary list');
      });
  };
  const countryState = () => state.;
  return {
    loadSummaryList,
    countryState
  };
};
