import React, { Fragment, useState } from 'react'
import moment from 'moment'

//editing text within edit event form is not working

const EditEvents = ({ event }) => {
	const [eventsData, setEvents] = useState(event)
	const [events_name, setEventName] = useState(event.events_name)
	const [events_location, setEventLocation] = useState(event.events_location)
	const [events_sponsor, setEventSponsor] = useState(event.events_sponsor)
	const [events_date, setEventDate] = useState(event.events_date)
	const [events_message, setEventMessage] = useState(event.events_message)

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
			await fetch(`http://localhost:5000/events/${event.events_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			window.location = '/'
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

			<div
				className='modal'
				id={`id${event.events_id}`}
				onClick={() => setEvents(eventsData)}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit Event</h4>
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

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-primary'
								data-dismiss='modal'
								onClick={(e) => updateEvent(e)}
							>
								Edit
							</button>

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
