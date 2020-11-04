import { useCallback, useState } from 'react';

const _editState = (state, setState) => namespace => edit => {
  const ns = state[namespace];
  setState(old => ({
    ...old,
    [namespace]: {
      ...ns,
      ...edit
    }
  }));
};

const _newState = setState => namespace => newNs => {
  setState(old => ({
    ...old,
    [namespace]: newNs
  }));
};

export default function useStore () {
  const [state, setState] = useState({
    country: {
      summary: {},
      fetching: false,
      error: ''
    },
    history: {
      history: [],
      fetching: false,
      error: ''
    }
  });

  const editState = useCallback(_editState(state, setState), [state, setState]);
  const newState = useCallback(_newState(setState), [setState]);

  return { state, setState, newState, editState };
}
