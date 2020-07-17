const Pool = require('pg').Pool

// const pool = new Pool({
// 	user: 'postgres',
// 	password: 'eHSD90*z28!',
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'eventplanner',
// })

const pool = new Pool({
	user: 'norocallattfkm',
	password: 'bf13f97abf39847c80a8f6206a21b6e6099c8b1161ff9914ea3c66fcb20d8b72',
	host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
	port: 5432,
	database: 'detfrjs6u40o6o',
})

module.exports = pool
