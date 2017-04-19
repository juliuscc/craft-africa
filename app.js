const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const morgan = require('morgan')

// Routes
// const index = require('./routes/index')

// Init App
const app = express()

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Router
// app.use('/', index)
app.use((req, res) => {
	res.render('404')
})

// Set Port
app.set('port', (process.env.PORT || 5000))

// Start server
/* eslint-disable no-console */
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`)
})
/* eslint-enable no-console */
