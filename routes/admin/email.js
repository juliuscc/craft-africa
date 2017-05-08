const router = require('express').Router()
const requiresAuth = require('./helper')
const mailTemplate = require('../../models/mailTemplates')

// Get all email templates.
router.get('/', (req, res) => {
	mailTemplate.getTemplates((err, templateList) => {
		if(templateList.length === 0) {
			requiresAuth(req, res, 'templates', { })
		} else {
			requiresAuth(req, res, 'templates', { templateList })
		}
	})
})

// Get email template by id.
router.get('/:emailId', (req, res) => {
	mailTemplate.getTemplateByName(req.params.emailId, (err, template) => {
		let data = template
		if(req.params.emailId === 'new') {
			req.params.emailId = ''
		}
		// Add error messages if the exists.
		if(err) {
			data = { result: 'Something went wrong', name: req.params.emailId, recipient: '', admin_subject: '', user_subject: '', admin_message: '', user_message: '' }
		} else if(!template) {
			data = { result: 'New Template', name: req.params.emailId, recipient: '', admin_subject: '', user_subject: '', admin_message: '', user_message: '' }
		}

		res.render('admin/templates', data)
	})
})

// Update specified email template by name.
router.post('/', (req, res) => {
	const data = req.body
	const tempData = {
		name: data.name,
		recipient: data.recipient,
		admin_subject: data.admin_subject,
		user_subject: data.user_subject,
		admin_message: data.admin_message,
		user_message: data.user_message
	}
	mailTemplate.updateTemplateById(data.id, tempData, (err) => {
		if(err) {
			data.result = `Could not update template: ${err}`
		} else {
			data.result = 'Successfully updated'
		}
		res.render('admin/templates', data)
	})
})

router.post('/delete', (req, res) => {
	const data = req.body
	mailTemplate.removeTemplate(data.id, (err) => {
		if(err) {
			throw err
		}
		res.redirect('/../admin/email')
	})
})

module.exports = router
