const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// ROUTES

    // add an event
app.post('/add-event', async (req, res) => {
    try {
        const { events_name, events_location, events_sponsor, events_date, events_message } = req.body
        const newEvent = await pool.query(
            'INSERT INTO events (events_name, events_location, events_sponsor, events_date, events_message) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [events_name, events_location, events_sponsor, events_date, events_message]
        )
        
        res.json(newEvent.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

    // update an event
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { events_name, events_location, events_sponsor, events_date, events_message } = req.body
        const updateEvent = await pool.query(
            'UPDATE events SET events_name = $1, events_location = $2, events_sponsor = $3, events_date = $4, events_message = $5 WHERE events_id = $6 RETURNING *',
            [events_name, events_location, events_sponsor, events_date, events_message, id]
        )

        res.json(updateEvent.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


    // delete an event
app.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteEvent = await pool.query('DELETE FROM events WHERE events_id = $1', [id])

        res.json('Event has been deleted!')
    } catch (err) {
        console.error(err.message)
    }
})


    // get all events
app.get('/events', async (req, res) => {
    try {
        const allEvents = await pool.query('SELECT * FROM events')
        res.json(allEvents.rows)
    } catch (err) {
        console.error(err.message)
    }
})

    // get an event
app.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await pool.query('SELECT * FROM events WHERE events_id = $1', [id])

        res.json(event.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

    // sign up to an event
    app.post('/sign-up', async (req, res) => {
        try {
            const { contacts_first_name, contacts_last_name, contacts_email, contacts_events } = req.body
            const newSignUp = await pool.query(
                'INSERT INTO contacts (contacts_first_name, contacts_last_name, contacts_email, contacts_events) VALUES($1, $2, $3, $4) RETURNING *',
                [contacts_first_name, contacts_last_name, contacts_email, contacts_events]
            )
            
            res.json(newSignUp.rows[0])
        } catch (err) {
            console.error(err.message)
        }
    })

app.listen(5000, () => {
    console.log('server has started on port 5000')
})