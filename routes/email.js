const router = require('express').Router()
const gmail = require('gmail-send')
const credentials = require('../config/credentials').email
const gmailConfig = require('../config/email')

router.get('/', (req, res) => {
	res.render('email')
})

router.get('/send', (req, res) => {
	res.render('email')
})

router.post('/send', (req, res) => {
	// Get form data
	const { emailadress } = req.body

	// Email stuff
	const emailData = {
		user: gmailConfig.user,
		pass: credentials.pass,
		to: gmailConfig.to,
		subject: 'test sub',
		text:
		`
			Please contact ${emailadress}
		`
	}

	const send = gmail()
	send(emailData)
		.then(() => {
			res.render('email', {
				message: `Your email adress ${emailadress} was sent to a salesperson.`
			})
		})
		.catch((err) => {
			res.render('email', {
				message: 'The message could not be sent'
			})
			throw err
		})
})

module.exports = router
