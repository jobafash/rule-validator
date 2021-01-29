import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound } from './errorMiddleware.js'
import getRoute from './getRoute.js'
import postRoute from './postRoute.js'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//bodyParser was added back to Express in release 4.16.0,
// so there's no need to install the package.
app.use(express.json())

app.use('/', getRoute)
app.use('/', postRoute)
app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
