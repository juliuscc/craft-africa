const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('handletemplates', {
		template: 'tempy',
		recipient: 'recy',
		subject: 'suby',
		message: 'messy'
	})
})

router.get('/edit', (req, res) => {
	res.render('handletemplates')
})

router.post('/edit', (req, res) => {
	// Get form data
	const { message, subject, email, templateName } = req.body

	res.render('handletemplates', {
		rmessage: `message is: ${message}`,
		rsubject: `subject is: ${subject}`,
		rrecipient: `recipeint mail is: ${email}`,
		rtemplate: `template name is: ${templateName}`
	})
})

module.exports = router
