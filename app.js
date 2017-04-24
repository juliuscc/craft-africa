const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const morgan = require('morgan')


var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy;  

var mongoose = require('mongoose');   
var session = require('express-session');

var configDB = require('./config/database.js');  
mongoose.connect(configDB.url);


// Init App
const app = express()


// Routes
const index = require('./routes/index')
const about = require('./routes/about')
const contact = require('./routes/contact')


 



// View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// User logins
app.use(passport.initialize());  
app.use(passport.session()); 

require('./config/passport')(passport);  

// Router
app.use('/', index)
app.use('/about', about)
app.use('/contact', contact)

app.use((req, res) => {
	res.render('404')
})






// app.use(session({ secret: 'shhsecret' })); ??? 



// Set Port
app.set('port', (process.env.PORT || 5000))

// Start server
/* eslint-disable no-console */
app.listen(app.get('port'), () => {
	console.log(`Server started on port ${app.get('port')}`)
})
/* eslint-enable no-console */
