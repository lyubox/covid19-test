import {
  SUMMARY_LIST_REQUESTED,
  SUMMARY_LIST_SUCCESS,
  SUMMARY_LIST_FAILURE,
  HISTORY_REQUESTED,
  HISTORY_SUCCESS,
  HISTORY_FAILURE
} from './actionTypes';
import { getSummary, getHistory } from '../service';

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

const historyRequested = {
  type: HISTORY_REQUESTED
};

const historySuccess = data => ({
  type: HISTORY_SUCCESS,
  payload: data
});

const historyFailure = error => ({
  type: HISTORY_FAILURE,
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

export const loadHistory = country => dispatch => {
  dispatch(historyRequested);

  console.log('Load history for ' + country);

  return getHistory(country)
    .then(history => dispatch(historySuccess(history)))
    .catch(e => {
      console.log(e);
      dispatch(historyFailure(`There was a problem loading history for ${country}!`));
    });
};
