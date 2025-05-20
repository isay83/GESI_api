import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import * as routes from './routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

Object.values(routes).forEach((route) => app.use(route))

export default app