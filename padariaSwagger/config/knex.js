import dotenv from 'dotenv'
import knex from 'knex'
dotenv.config()

const knexStringcase = require('knex-stringcase')

// Converts Postgres snake_case to camelCase
const options = knexStringcase({
	client: 'mysql2',
	connection: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	},
})

const db = knex(options)

export default db
