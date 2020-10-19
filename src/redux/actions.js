import {
  SUMMARY_LIST_REQUESTED,
  SUMMARY_LIST_SUCCESS,
  SUMMARY_LIST_FAILURE
} from './actionTypes';
import { getSummary } from '../service';

const summaryListRequested = {
  type: SUMMARY_LIST_REQUESTED
};

const summaryListSuccess = list => ({
  type: SUMMARY_LIST_SUCCESS,
  payload: list
});

const summaryListFailure = error => ({
  type: SUMMARY_LIST_FAILURE,
  payload: error
});

export const loadSummaryList = dispatch => {
  dispatch(summaryListRequested);

  console.log('Load summary');
  return getSummary()
    .then(summary => dispatch(summaryListSuccess(summary)))
    .catch(e => {
      console.log(e);
      dispatch(summaryListFailure('There was a problem loading the summary list!'));
    });
};
