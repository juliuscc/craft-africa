const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const morgan = require('morgan')

// Routes
const index = require('./routes/index')
const about = require('./routes/about')
const contact = require('./routes/contact')
const calculationForm = require('./routes/calculationform')
const email = require('./routes/email')
const handleTemplates = require('./routes/handletemplates')

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
app.use('/', index)
app.use('/about', about)
app.use('/contact', contact)
app.use('/calculationform', calculationForm)
app.use('/email', email)
app.use('/handletemplates', handleTemplates)

app.use((req, res) => {
	res.render('404')
})

// Error handling
app.use((req, res) => {
	res.status(404)
	res.render('404')
})

app.use((err, req, res, next) => {
	res.status(500)
	res.render('500')
})


// Set Port
app.set('port', (process.env.PORT || 5000))

// Start server
/* eslint-disable no-console */
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`)
})
/* eslint-enable no-console */
