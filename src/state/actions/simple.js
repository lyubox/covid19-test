const request = () => ({ type: 'REQUEST'})
const success = payload => ({type: 'SUCCESS', payload})
const update = () => ({type: 'UPDATE' })
const failure = payload => ({type: 'FAILURE', payload})

export {
	request,
	success,
	update,
	failure
}