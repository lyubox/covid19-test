import {
  SUMMARY_LIST_REQUESTED,
  SUMMARY_LIST_SUCCESS,
  SUMMARY_LIST_FAILURE
} from '../actionTypes';

const initState = {
  summery: [],
  summeryFetching: false,
  error: ''
};

export default function (state = initState, action) {
  const { type, payload } = action;

  const actions = {
    [SUMMARY_LIST_REQUESTED]: {
      ...state,
      summeryFetching: true
    },
    [SUMMARY_LIST_SUCCESS]: {
      ...state,
      summeryFetching: false,
      summery: payload
    },
    [SUMMARY_LIST_FAILURE]: {
      ...state,
      summeryFetching: false,
      error: payload
    }
  };

  return actions[type] || state;
}
