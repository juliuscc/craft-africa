const router = require('express').Router()
const auth = require('./auth')
const mailTemplate = require('../../models/mailTemplates')

// Get all email templates.
router.get('/', (req, res) => {
	auth.runIfAdmin(req, res, () => {
		mailTemplate.getTemplates((err, templateList) => {
			let outputData = {}
			if(templateList.length !== 0) {
				outputData = { templateList }
			}
			res.render('admin/templates', outputData)
		})
	})
})

// Update specified email template by name.
router.post('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		const data = req.body
		const tempData = {
			name: data.name,
			recipient: data.recipient,
			admin_subject: data.admin_subject,
			user_subject: data.user_subject,
			admin_message: data.admin_message,
			user_message: data.user_message
		}

		// This is a old template
		if(data.id) {
			mailTemplate.updateTemplateById(data.id, tempData, (err) => {
				if(err) {
					res.render('admin/errormessage', { message: `Could not update template: ${err}`, username: req.user.local.name })
					throw err
				} else {
					res.redirect('/admin/email')
				}
			})
		// This is a new template
		} else {
			console.log(tempData)
			// ValidationError: Path `user_message` is required., Path `admin_message` is required.
			mailTemplate.createTemplate(tempData, (err) => {
				if(err) {
					res.render('admin/errormessage', { message: `Could not create new template: ${err}`, username: req.user.local.name })
					throw err
				} else {
					res.redirect('/admin/email')
				}
			})
		}
	})
})

router.post('/delete', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		const data = req.body
		mailTemplate.removeTemplate(data.id, (err) => {
			if(err) {
				res.render('admin/errormessage', { message: err })
				throw err
			}
			res.redirect('/../admin/email')
		})
	})
})

module.exports = router
