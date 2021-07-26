const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { render } = require('ejs')

mongoose.connect(process.env.url, { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to mongodb'), app.listen(process.env,PORT || 27017))
    .catch((err) => console.log(err))

const db = mongoose.connection

db.on('error', err => {
  console.error('connection error:', err)
})

app.use(morgan('dev'))

app.use(bodyParser.json())

// set view engine
app.set('view engine', 'ejs')

// static middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const usersRoute = require('./routes/users')

app.get('/', usersRoute)

app.post('/', usersRoute)

app.use((req, res) => {
  res.render('landing')
})