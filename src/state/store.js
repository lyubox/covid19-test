import { useState } from 'react';

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

  return { state, setState };
}
