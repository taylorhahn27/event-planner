import React, { Fragment, useState, useEffect } from 'react'

const ListEventDetails = () => {
	const [contactsData, setContactsData] = useState([])
	const [eventsData, setEvents] = useState([])

	const getDetails = async () => {
		try {
			const response = await fetch(`http://localhost:5000/events/35`)
			const jsonData = await response.json()

			setEvents(jsonData)
		} catch (err) {
			console.error(err.message)
		}
	}

	const getContacts = async () => {
		try {
			const response = await fetch('http://localhost:5000/contacts')
			const jsonData = await response.json()
			const contactData = jsonData.filter(async (eventName) => {
				return eventName.contacts_events.includes(eventsData.events_name)
			})

			setContactsData(contactData)
		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getDetails()
		getContacts()
	}, [])

	return (
		<Fragment>
			<h1 className='text-center mt-5'>{eventsData.events_name}</h1>
			<h4 className='text-center mt-5'>{eventsData.events_message}</h4>
			<table className='table table-striped table-hover mt-5 text-center'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
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
