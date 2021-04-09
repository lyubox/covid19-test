import { success, request, failure, update} from '../actions/simple'
import { StateContext } from '../context'
import { useCallback, useContext } from 'react'
import { getHistory, postHistory } from '../../api/service'

const useAsyncActions = () => {
	const { dispatchHistory: dispatch } = useContext(StateContext)

	const loadHistory = useCallback(slug => {
		dispatch(request())

		return getHistory(slug)
			.then((history) => dispatch(success(history)))
			.catch((error) =>	dispatch(failure('There was a problem loading the history list')))
	}, [dispatch])

// post, put, delete ...

	const saveHistory = history => {
		dispatch(request())

		return postHistory(history)
			.then(r => dispatch(update()))
			.catch(err => dispatch(failure(err.message)))
	}

	return {
		loadHistory,
		saveHistory
	}
}

export default useAsyncActions