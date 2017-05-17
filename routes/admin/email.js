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

		if(req.body.id) {
			mailTemplate.updateTemplateById(data.id, data, (err) => {
				if(err) {
					res.render('admin/errormessage', { message: `Could not update template: ${err}`, username: req.user.local.name })
				} else {
					data.result = 'Successfully updated'
					res.redirect('/admin/email')
				}
			})
		// This is a new template: we need to create it instead
		} else {
			mailTemplate.createTemplate(data, (err) => {
				if(err) {
					res.render('admin/errormessage', { message: err, username: req.user.local.name })
				} else {
					data.result = `Successfully create new template: ${data.name}`
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
