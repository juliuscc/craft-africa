const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const configDB = require('./config/database.js')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const Logger = require('./models/loggerAPI')
// const favicon = require('serve-favicon')

mongoose.connect(configDB.url)

function views(req, res, next) {
	if(req.method === 'GET') {
		let url = req.originalUrl.toLowerCase()
		if(!url.includes('.') && !url.includes('admin') && !url.includes('data')) {
			if(url === '/') {
				url = 'homepage'
			}
			Logger.updateViews(url)
		}
	}
	next()
}

// Init App
const app = express()

// Favicon
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

// Passport
app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// User logins
require('./config/passport')(passport)

// Stats
app.use(views)

// Routes
const index = require('./routes/index')
const about = require('./routes/about')
const contact = require('./routes/contact')
const calculationForm = require('./routes/calculationform')
const email = require('./routes/email')
const admin = require('./routes/admin')
const data = require('./routes/data')
const footprint = require('./routes/footprint')
const product = require('./routes/product')
const update = require('./routes/update')

// Router
app.use('/', index)
app.use('/about', about)
app.use('/contact', contact)
app.use('/calculationform', calculationForm)
app.use('/email', email)
app.use('/admin', admin)
app.use('/data', data)
app.use('/footprint', footprint)
app.use('/product', product)
app.use('/update', update)

// Error handling
app.use((req, res) => {
	res.status(404)
	res.render('404')
})

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
	throw err
})
/* eslint-enable no-unused-vars */

// Set Port
app.set('port', (process.env.PORT || 5000))

// Start server
/* eslint-disable no-console */
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`)
})
/* eslint-enable no-console */
