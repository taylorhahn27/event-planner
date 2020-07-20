import React, { Fragment, useState } from 'react'

// Handles displaying a form to sign up to a specific event
// and adds that contacts info to the contacts table in the db
const SignUpForm = ({ event }) => {
	// Declares and Sets states for the respective data points using the useState() Hook
	const [contacts_first_name, setFirstName] = useState('')
	const [contacts_last_name, setLastName] = useState('')
	const [contacts_email, setEmail] = useState('')
	const [contacts_events, setEvents] = useState([event.events_name])

	// Handles adding a contact to the db with the respective data
	const signUp = async (e) => {
		e.preventDefault()

		try {
			const body = {
				contacts_first_name,
				contacts_last_name,
				contacts_email,
				contacts_events,
			}

			await fetch('http://localhost:5000/sign-up', {
				method: 'POST',
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
				className='btn btn-warning'
				data-toggle='modal'
				data-target={`#sign-up/${event.events_id}`}
			>
				Sign Up
			</button>

			<div className='modal' id={`sign-up/${event.events_id}`}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Sign Up Form</h4>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								onClick={() => (window.location = '/events')}
							>
								&times;
							</button>
						</div>

						<div className='modal-body'>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='First Name'
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Last Name'
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='email'
									className='form-control'
									placeholder='Email'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									value={event.events_name}
									onChange={(e) => setEvents([e.target.value.toString()])}
								/>
							</div>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-warning'
								data-dismiss='modal'
								onClick={(e) => signUp(e)}
							>
								Sign Up
							</button>

							<button
								type='button'
								className='btn btn-danger'
								data-dismiss='modal'
								onClick={() => (window.location = '/events')}
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

export default SignUpForm
