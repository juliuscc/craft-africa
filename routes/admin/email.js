const router = require('express').Router()
const mailTemplate = require('../../models/mailTemplates')

// Get all email templates.
router.get('/', (req, res) => {
	mailTemplate.getTemplates((err, templates) => {
		res.render('admin/templates', {
			templateList: templates
		})
	})
})

// Get email template by id.
router.get('/:emailId', (req, res) => {
	mailTemplate.getTemplateByName(req.params.emailId, (err, template) => {
		let data = template

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

	mailTemplate.update({ name: data.name }, req.body, { upsert: true }, (err) => {
		if(err) {
			data.result = `Could not update template: ${err}`
		} else {
			data.result = 'Successfully updated'
		}
		res.render('admin/templates', data)
	})
})

module.exports = router
