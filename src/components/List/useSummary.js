import { useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import useStore from '../../state';
import { loadSummaryList } from '../../state/country';
import { summaryList } from '../../redux/selectors';

export default function useSummary() {
  useEffect(async () => {
    await loadSummaryList();
  }, []);

  const summary = useSelector(summaryList);

  return {
    summary
  };
}
