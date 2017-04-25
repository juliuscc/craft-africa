const router = require('express').Router()
const gmail = require('gmail-send')
const emailcredentials = require('../config/credentials').email
const mailTemplate = require('../models/mailTemplates')
const Handlebars = require('handlebars')

// Render email send form
router.get('/', (req, res) => {
	res.render('email')
})

// Render email send form
router.get('/send', (req, res) => {
	res.render('email')
})

// Send an email to admin and user.
router.post('/send', (req, res) => {
	// Get form data
	const { emailadress, message_template } = req.body

	// Email credentials
	const adminEmailData = {
		user: emailcredentials.user,
		pass: emailcredentials.pass
	}

	const userEmailData = {
		user: emailcredentials.user,
		pass: emailcredentials.pass
	}

	// Querying database for info
	mailTemplate.getTemplateByName(message_template, (databaseErr, template) => {
		if(databaseErr) {
			res.render('email', {
				message: 'This link is currently not active. Please try another'
			})
		} else {
			// recipients
			adminEmailData.to = template.recipient
			userEmailData.to = emailadress

			// Subjects
			adminEmailData.subject = template.admin_subject
			userEmailData.subject = template.user_subject

			// message (compile handlebars code)
			const adminMessageCompiled = Handlebars.compile(template.admin_message)
			const userMessageCompiled = Handlebars.compile(template.user_message)

			adminEmailData.html = adminMessageCompiled({ emailadress })
			userEmailData.html = userMessageCompiled({ emailadress })

			// Sending emails
			const send = gmail()

			// Admin email
			send(adminEmailData, (errAdmin) => {
				// User email
				send(userEmailData, (errUser) => {
					if(errAdmin || errUser) {
						res.render('email', {
							message: 'Something went wrong while trying to send email.'
						})
					}

					res.render('email', {
						message: `Your email adress ${emailadress} was sent to a salesperson. We will be in touch shortly.`
					})
				})
			})
		}
	})
})

module.exports = router
