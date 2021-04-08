import { success, request, failure} from '../actions/simple'
import { StateContext } from '../context'
import { useCallback, useContext } from 'react'
import { getHistory } from '../../api/service'

const useAsyncActions = () => {
	const { dispatchHistory: dispatch } = useContext(StateContext)

	const loadHistory = useCallback(slug => {
		dispatch(request())

		return getHistory(slug)
			.then((history) => dispatch(success(history)))
			.catch((error) =>	dispatch(failure('There was a problem loading the history list')))
	}, [dispatch])

// post, put, delete ...

	return {
		loadHistory
	}
}

export default useAsyncActions