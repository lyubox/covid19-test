import {
  HISTORY_REQUESTED,
  HISTORY_SUCCESS,
  HISTORY_FAILURE
} from '../actionTypes';

const initState = {
  history: [],
  historyFetching: false,
  error: ''
};

export default function (state = initState, action) {
  const { type, payload } = action;

  const actions = {
    [HISTORY_REQUESTED]: {
      ...state,
      historyFetching: true
    },
    [HISTORY_SUCCESS]: {
      ...state,
      historyFetching: false,
      data: payload
    },
    [HISTORY_FAILURE]: {
      ...state,
      historyFetching: false,
      error: payload
    }
  };

  return actions[type] || state;
}
