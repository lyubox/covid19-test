const request = () => ({ type: 'request'})
const success = payload => ({type: 'success', payload})
const failure = payload => ({type: 'failure', payload})

export {
	request,
	success,
	failure
}