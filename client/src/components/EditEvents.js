import React, { Fragment, useState } from 'react'
import moment from 'moment'

// Handles the form for editing a specific event by its id property
// by taking in the event prop handed down from the ListEvents component
const EditEvents = ({ event }) => {
	// Declares and Sets states data as a whole using the useState() Hook based of event prop passed down (NOT finished, form fields persisting for some reason)
	const [eventsData, setEvents] = useState(event)
	// Declares and Sets default state for an events respective fields using the useState() Hook based of event prop passed down
	const [events_name, setEventName] = useState(event.events_name)
	const [events_location, setEventLocation] = useState(event.events_location)
	const [events_sponsor, setEventSponsor] = useState(event.events_sponsor)
	const [events_date, setEventDate] = useState(event.events_date)
	const [events_message, setEventMessage] = useState(event.events_message)

	// Handles fetching the specific events data and updating the respective changes in the db
	const updateEvent = async (e) => {
		e.preventDefault()

		try {
			const body = {
				events_name,
				events_location,
				events_sponsor,
				events_date,
				events_message,
			}

			// Fetches an event based of the events_id parameter and updates the db using the PUT method
			await fetch(`http://localhost:5000/events/${event.events_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			window.location = '/events'
		} catch (err) {
			console.error(err.message)
		}
	}

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-primary'
				data-toggle='modal'
				data-target={`#id${event.events_id}`}
			>
				Edit
			</button>

			<div className='modal' id={`id${event.events_id}`}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit Event</h4>
							{/*
								This button makes sure to set the form back to its
								original state if changes were entered but not submitted
								due to pressing the X button instead of Edit button
								(NOT finished, form fields persisting for some reason)
							*/}
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								onClick={() => setEvents(eventsData)}
							>
								&times;
							</button>
						</div>

						<div className='modal-body'>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									value={events_name}
									onChange={(e) => setEventName(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									value={events_location}
									onChange={(e) => setEventLocation(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									value={events_sponsor}
									onChange={(e) => setEventSponsor(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder={moment(events_date).format('L')}
									onChange={(e) => setEventDate(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									value={events_message}
									onChange={(e) => setEventMessage(e.target.value)}
								/>
							</div>
						</div>

						{/*
								This button calls the updateEvent method which is
								responsible for actually submitting the changes
								to the db
							*/}
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-dismiss='modal'
								onClick={(e) => updateEvent(e)}
							>
								Edit
							</button>

							{/*
								This button makes sure to set the form back to its
								original state if changes were entered but not submitted
								due to pressing the Close button instead of Edit button
								(NOT finished, form fields persisting for some reason)
							*/}
							<button
								type='button'
								className='btn btn-danger'
								data-dismiss='modal'
								onClick={() => setEvents(eventsData)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default EditEvents
