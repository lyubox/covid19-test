import React, { useMemo, useReducer } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import { StateContext } from './state/context'
import simpleReducer from './state/reducers/simple'

const initState = entity => ({
	fetching: false,
	error: '',
	[entity]: []
})

function App () {
	const [history, dispatchHistory] = useReducer(simpleReducer('history'), initState('history'))
	const [summary, dispatchSummary] = useReducer(simpleReducer('summary'), initState('summary'))

	const value = useMemo(() => ({
		history,
		summary,
		dispatchSummary,
		dispatchHistory
	}), [history, summary])

	return (
		<StateContext.Provider value={value}>
			<Router>
				<Switch>
					<Route exact path="/" children={<Home/>}/>
					<Route path="/:module/:country" children={<Home/>}/>
				</Switch>
			</Router>
		</StateContext.Provider>
	)
}

export default App
