import {
  SUMMARY_LIST_REQUESTED,
  SUMMARY_LIST_SUCCESS,
  SUMMARY_LIST_FAILURE
} from '../actionTypes';

const initState = {
  summary: [],
  summaryFetching: false,
  error: ''
};

export default function (state = initState, action) {
  const { type, payload } = action;

  const actions = {
    [SUMMARY_LIST_REQUESTED]: {
      ...state,
      summaryFetching: true
    },
    [SUMMARY_LIST_SUCCESS]: {
      ...state,
      summaryFetching: false,
      summary: payload
    },
    [SUMMARY_LIST_FAILURE]: {
      ...state,
      summaryFetching: false,
      error: payload
    }
  };

  return actions[type] || state;
}
