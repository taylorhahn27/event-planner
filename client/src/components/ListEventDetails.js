import React, { Fragment, useState, useEffect } from 'react'

// Handles the dispalying of the details of a specific event and listing all attendees who
// signed up for that specific event (NOT finished, only hard coded for event with id 7 as of now)
const ListEventDetails = () => {
	// Declares and Sets state for a specific event in an array of objects using the useState() Hook
	const [contactsData, setContactsData] = useState([])
	// Declares and Sets state for all contacts in an array of objects using the useState() Hook
	const [eventsDetails, setEvents] = useState([])

	// Handles getting the specified event (NOT finished, only hard coded for event with id 7 as of now)
	// as well as all contacts who have signed up for said specified event
	const getDetails = async () => {
		try {
			const eventResponse = await fetch(`http://localhost:5000/events/7`)
			const contactResponse = await fetch('http://localhost:5000/contacts')

			const eventJson = await eventResponse.json()
			const contactJson = await contactResponse.json()

			// Filters an array of objects to only return contacts who's contacts_events array
			// contains the specific event name being requested
			const contactData = contactJson.filter((eventName) => {
				return eventName.contacts_events[0].includes(eventJson.events_name)
			})

			setContactsData(contactData)
			setEvents(eventJson)
		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getDetails()
	}, [])

	return (
		<Fragment>
			<h1 className='text-center mt-5'>{eventsDetails.events_name}</h1>
			<h4 className='text-center mt-5'>{eventsDetails.events_message}</h4>
			<table className='table table-striped table-hover mt-5 text-center'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{/*
						Takes the state contactsData which is an array of objects containing
						all contacts who's contacts_events array contains the spefic fetched event name
						and maps them to a table
					*/}
					{contactsData.map((contact) => (
						<tr key={contact.contacts_id}>
							<td>{contact.contacts_first_name}</td>
							<td>{contact.contacts_last_name}</td>
							<td>{contact.contacts_email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	)
}

export default ListEventDetails
