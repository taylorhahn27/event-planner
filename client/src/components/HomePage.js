import React from 'react'
import InputEvents from './InputEvents'
import ListEvents from './ListEvents'
import ListEventDetails from './ListEventDetails'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import '../App.css'

// Handles the HomePage and navbar as well as the routing for individual pages
const HomePage = () => {
	return (
		<Router>
			<div className='container'>
				<nav className='navbar navbar-expand-sm bg-light navbar-light'>
					<ul className='navbar-nav'>
						<span className='navbar-item font-weight-bold pr-3'>
							Event Planner
						</span>
						<li className='nav-item pr-3'>
							<Link to='/'>Home</Link>
						</li>
						<li className='nav-item pr-3'>
							<Link to='/add-event'>Add Event</Link>
						</li>
						<li className='nav-item'>
							<Link to='/events'>List of Events</Link>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path='/add-event' component={InputEvents} />
					<Route path='/events' component={ListEvents} />
					<Route path='/event-details/:id' component={ListEventDetails} />
				</Switch>
			</div>
		</Router>
	)
}

export default HomePage
