const router = require('express').Router()
const gmail = require('gmail-send')
const emailcredentials = require('../config/credentials').email
const mailTemplate = require('../models/mailTemplates')
const Handlebars = require('handlebars')

const nodemailer = require('nodemailer')

// Send an email to admin and user. No response if the sending part fails
router.post('/send', (req, res) => {
	// Check for errors
	if(!req.body.message_template) {
		res.render('email', {
			message: 'Something is wrong with the form. Please reach out to us using any other listed at the contact page.'
		})
		return
	}

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
	mailTemplate.getTemplateByName(req.body.message_template, (databaseErr, template) => {
		if(databaseErr || !template) {
			res.render('email', {
				message: 'Something went wrong while trying to send email.'
			})
		} else {
			res.render('email', {
				message: `Your email adress ${req.body.emailadress} was sent to a salesperson. We will be in touch shortly.`
			})

			// recipients
			adminEmailData.to = template.recipient
			userEmailData.to = req.body.emailadress

			// Subjects
			adminEmailData.subject = template.admin_subject
			userEmailData.subject = template.user_subject

			// message (compile handlebars code)
			const adminMessageCompiled = Handlebars.compile(template.admin_message)
			const userMessageCompiled = Handlebars.compile(template.user_message)

			adminEmailData.html = adminMessageCompiled(req.body)
			userEmailData.html = userMessageCompiled(req.body)


			// create reusable transporter object using the default SMTP transport
			const transporter = nodemailer.createTransport({
				host: 'mailcluster.loopia.se',
				port: 465,
				secure: true, // use SSL
				auth: {
					user: emailcredentials.user,
					pass: emailcredentials.pass
				}
			})

			// setup email data with unicode symbols
			const mailAdmin = {
				from: '"Craft Africa - Contact page" <info@craft-africa.com>', // sender address
				to: adminEmailData.to, // list of receivers
				subject: adminEmailData.subject, // Subject line
				// text: req.body.message // plain text body
				html: adminEmailData.html // html body
			}

			const mailUser = {
				from: '"Craft Africa" <info@craft-africa.com>', // sender address
				to: req.body.emailadress, // list of receivers
				subject: userEmailData.subject, // Subject line
				// text: 'Hello world ?', // plain text body
				html: userEmailData.html // html body
			}


			transporter.sendMail(mailUser, (error, info) => {
				if(error) {
					// return console.log(error)
				}
				// console.log('Message %s sent: %s', info.messageId, info.response)
			})

			// send mail with defined transport object
			transporter.sendMail(mailAdmin, (error, info) => {
				if(error) {
					// return console.log(error)
				}
				// console.log('Message %s sent: %s', info.messageId, info.response)
			})
		}
	})
})

// Not used for now. Sends and email and returns a json response
router.post('/send/background', (req, res) => {
	// Check for errors
	if(!req.body.message_template) {
		res.json({
			json: 'Something is wrong with the form'
		})
		return
	}

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
	mailTemplate.getTemplateByName(req.body.message_template, (databaseErr, template) => {
		if(databaseErr || !template) {
			res.json({
				error: 'This link is currently not active. Please try another'
			})
		} else {
			// recipients
			adminEmailData.to = template.recipient
			userEmailData.to = req.body.emailadress

			// Subjects
			adminEmailData.subject = template.admin_subject
			userEmailData.subject = template.user_subject

			// message (compile handlebars code)
			const adminMessageCompiled = Handlebars.compile(template.admin_message)
			const userMessageCompiled = Handlebars.compile(template.user_message)

			adminEmailData.html = adminMessageCompiled(req.body)
			userEmailData.html = userMessageCompiled(req.body)

			// Sending emails
			const send = gmail()

			// Admin email
			send(adminEmailData, (errAdmin) => {
				// User email
				send(userEmailData, (errUser) => {
					if(errAdmin || errUser) {
						res.json({
							error: 'Something went wrong while trying to send email.'
						})
					}

					res.json({
						message: `Your email adress ${req.body.emailadress} was sent to a salesperson. We will be in touch shortly.`
					})
				})
			})
		}
	})
})

router.post('/send/background', (req, res) => {
	// Check for errors
	if(!req.body.message_template) {
		res.json({
			json: 'Something is wrong with the form'
		})
		return
	}

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
	mailTemplate.getTemplateByName(req.body.message_template, (databaseErr, template) => {
		if(databaseErr || !template) {
			res.json({
				error: 'This link is currently not active. Please try another'
			})
		} else {
			// recipients
			adminEmailData.to = template.recipient
			userEmailData.to = req.body.emailadress

			// Subjects
			adminEmailData.subject = template.admin_subject
			userEmailData.subject = template.user_subject

			// message (compile handlebars code)
			const adminMessageCompiled = Handlebars.compile(template.admin_message)
			const userMessageCompiled = Handlebars.compile(template.user_message)

			adminEmailData.html = adminMessageCompiled(req.body)
			userEmailData.html = userMessageCompiled(req.body)

			// Sending emails
			const send = gmail()

			// Admin email
			send(adminEmailData, (errAdmin) => {
				// User email
				send(userEmailData, (errUser) => {
					if(errAdmin || errUser) {
						res.json({
							error: 'Something went wrong while trying to send email.'
						})
					}

					res.json({
						message: `Your email adress ${req.body.emailadress} was sent to a salesperson. We will be in touch shortly.`
					})
				})
			})
		}
	})
})

module.exports = router
