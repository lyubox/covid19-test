import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSummaryList } from '../../redux/actions';
import { summaryList, summaryGlobal } from '../../redux/selectors';

export default function useSummary () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSummaryList);
  }, []);

  const summary = useSelector(summaryList);
  const globalSummary = useSelector(summaryGlobal);
  console.log({ summary });
  console.log({ globalSummary });

  return {
    summary
  };
}
