import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSummaryList } from './redux/actions';
import { summaryList } from './redux/selectors';

export default function useSummary () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSummaryList);
  }, []);

  const summary = useSelector(summaryList);
  console.log({ summary });

  return {
    summary
  };
}
