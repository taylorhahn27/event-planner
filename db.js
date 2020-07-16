const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres',
	password: 'eHSD90*z28!',
	host: 'localhost',
	port: 5432,
	database: 'eventplanner',
})

module.exports = pool
