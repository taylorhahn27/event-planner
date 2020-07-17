import React, { Fragment } from 'react'
import InputEvents from './components/InputEvents'
import ListEvents from './components/ListEvents'
import './App.css'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<InputEvents />
				<ListEvents />
			</div>
		</Fragment>
	)
}

export default App
