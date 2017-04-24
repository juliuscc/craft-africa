const router = require('express').Router()
const gmail = require('gmail-send')
const emailcredentials = require('../config/credentials').email
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
		user: emailcredentials.user,
		pass: emailcredentials.pass,
		to: gmailConfig.testAdmin,
		subject: 'test sub',
		text:
		`
			Please contact ${emailadress}
		`
	}

	const send = gmail()
	send(emailData, (err) => {
		if(err) {
			res.render('email', {
				message: 'The message could not be sent'
			})
			throw err
		}
		res.render('email', {
			message: `Your email adress ${emailadress} was sent to a salesperson.`
		})
	})
})

module.exports = router
