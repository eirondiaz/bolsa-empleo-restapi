const express = require('express')
const cors = require('cors')
const path = require('path')
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger-doc')
require('./database')

//settings
const app = express()
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
require('dotenv').config()
app.set('port', process.env.PORT || 3500)

//middlewares
app.use(cors())
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.disable("view cache");

//routes
//app.get('/', (req, res) => res.status(200).json({message: 'working'}))
app.get('/', require('./routes/home.routes'))
app.get('/docs', (req, res) => {
    res.render('home/docs')
})
app.use('/api/v1/auth', require('./routes/auth.routes'))
app.use('/api/v1/job', require('./routes/job.routes'))
app.use('/api/v1/category', require('./routes/category.routes'))
app.use('/api/v1/solicitud', require('./routes/solicitud.routes'))

module.exports = app