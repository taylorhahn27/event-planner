import React, { Fragment, useEffect, useState } from 'react'
import EditEvents from './EditEvents'
import moment from 'moment'

const ListEvents = () => {
	const [eventsData, setEvents] = useState([])

	const getEvents = async () => {
		try {
			const response = await fetch('http://localhost:5000/events')
			const jsonData = await response.json()

			setEvents(jsonData)
		} catch (err) {
			console.error(err.message)
		}
	}

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
			<table className='table table-striped table-hover mt-5 text-center'>
				<thead>
					<tr>
						<th>Event Name</th>
						<th>Location</th>
						<th>Sponsored by</th>
						<th>Date</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{eventsData.map((event) => (
						<tr key={event.events_id}>
							<td>{event.events_name}</td>
							<td>{event.events_location}</td>
							<td>{event.events_sponsor}</td>
							<td>{moment(event.events_date).format('MMM Do YY')}</td>
							<td>
								<EditEvents event={event} />
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
