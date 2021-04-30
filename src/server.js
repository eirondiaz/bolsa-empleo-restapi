const express = require('express')
const cors = require('cors')
require('./database')

//settings
const app = express()
require('dotenv').config()
app.set('port', process.env.PORT || 3500)

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.get('/', (req, res) => res.status(200).json({message: 'working'}))
app.use('/api/v1/auth', require('./routes/auth.routes'))
app.use('/api/v1/job', require('./routes/job.routes'))
app.use('/api/v1/category', require('./routes/category.routes'))
app.use('/api/v1/solicitud', require('./routes/solicitud.routes'))

module.exports = app