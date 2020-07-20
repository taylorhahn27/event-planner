import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditEvents from './EditEvents'
import SignUpForm from './SignUpForm'
import moment from 'moment'

// Handles listing out all events created into a table
const ListEvents = () => {
	// Declares and Sets state for all events into an array of objects using the useState() Hook
	const [eventsData, setEvents] = useState([])

	// Handles fetching all events using the server.js api GET method
	const getEvents = async () => {
		try {
			const response = await fetch('http://localhost:5000/events')
			const jsonData = await response.json()

			setEvents(jsonData)
		} catch (err) {
			console.error(err.message)
		}
	}

	// Handles fetching a specific event to be deleted based off an events id using the server.js api DELETE method
	const deleteEvent = async (id) => {
		try {
			await fetch(`http://localhost:5000/events/${id}`, {
				method: 'DELETE',
			})

			setEvents(eventsData.filter((event) => event.events_id !== id))
		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getEvents()
	}, [])

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Events</h1>
			<table className='table table-striped table-hover mt-5 text-center'>
				<thead>
					<tr>
						<th>Event Name</th>
						<th>Location</th>
						<th>Sponsored by</th>
						<th>Date</th>
						<th>Edit</th>
						<th>Sign Up</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{/*
						Takes the state eventsData which is an array of objects containing
						all events and maps them to a table as well as passing down
						state as props to the EditEvents and SignUpForm components
					*/}
					{eventsData.map((event) => (
						<tr key={event.events_id}>
							<td>
								<Link to={`/event-details/${event.events_id}`}>
									{event.events_name}
								</Link>
							</td>
							<td>{event.events_location}</td>
							<td>{event.events_sponsor}</td>
							<td>{moment(event.events_date).format('L')}</td>
							<td>
								<EditEvents event={event} />
							</td>
							<td>
								<SignUpForm event={event} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteEvent(event.events_id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	)
}

export default ListEvents
