import React, { useContext, useMemo, useState } from 'react';
import { countryInitState } from './country';
import { historyInitState } from './history';

const initState = {
  country: countryInitState,
  history: historyInitState
};

export default function useStore() {
  const [state, setState] = useState(initState);
  const context = useMemo(() => React.createContext([state, setState]), []);

  const useStore = () => useContext(context);

  return { context, initState, useStore };
}
