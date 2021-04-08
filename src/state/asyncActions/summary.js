import { request, success, failure } from '../actions/simple'
import { StateContext } from '../context'
import { useCallback, useContext } from 'react'
import { getSummary } from '../../api/service'

const useAsyncActions = () => {
	const { dispatchSummary: dispatch } = useContext(StateContext)

	const loadSummary = useCallback(() => {
		dispatch(request())

		return getSummary()
			.then((summary) => dispatch(success(summary)))
			.catch((error) => dispatch(failure('There was a problem loading the summary list')))
	}, [dispatch])

// post, put, delete ...

	return {
		loadSummary
	}
}

export default useAsyncActions