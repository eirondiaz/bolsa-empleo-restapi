const express = require('express')
const cors = require('cors')
require('./database')
require('dotenv').config()

//settings
const app = express()
app.set('port', process.env.PORT || 3500)

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.get('/', (req, res) => res.status(200).json({message: 'working'}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/job', require('./routes/job.routes'))
app.use('/api/category', require('./routes/category.routes'))
app.use('/api/solicitud', require('./routes/solicitud.routes'))

module.exports = app