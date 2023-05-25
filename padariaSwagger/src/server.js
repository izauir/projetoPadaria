import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'
import dotenv from 'dotenv'

// routes import
import funcionario from './funcionario/routes'
import logFuncionario from './logFuncionario/routes'
import estoque from './estoque/routes'
import produto from './produto/routes'
import venda from './venda/routes'

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

// load env variables based on node_env
dotenv.config()
console.info('Starting server...')

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded  

// CORS
app.use(cors())

const router = express.Router()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

router.get('/version', async (req, res) => {
	try {
		return res.send({ version: '1.0.0'})
	} catch (error) {
		error.component = `${req.method} /api${req.originalUrl}`
		res.status(400).send({ error: 'Internal error' })
	}
})

router.use('/funcionario', funcionario)
router.use('/log-funcionario', logFuncionario)
router.use('/estoque', estoque)
router.use('/produto', produto)
router.use('/venda', venda)

app.use('/data', express.static(path.join(process.cwd(), process.env.DATA)))
app.use('/', router)

const server = http.createServer(app)
const port = process.argv[2] ? process.argv[2] : process.env.PORT
server.listen(port, () => console.info(`Server listening on port ${port}`))