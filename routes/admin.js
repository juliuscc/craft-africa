const router = require('express').Router()
const mailTemplate = require('../models/mailTemplates')

router.get('/email', (req, res) => {
	console.log('email')

	res.render('handletemplates')

	mailTemplate.getTemplateByName('seller', (err, template) => {
		if (err){
			console.log(err)
			console.log('hgska')
		}
		else{
			console.log(template)
			console.log('hgsgdfsagrdgsjdjika')
			res.render('handletemplates', {
				name: template.name,
				recipient: template.recipient,
				subject: template.subject,
				message: template.message
			})
		}
	})

})


router.post('/email', (req, res) => {

	const inputName = req.body.name

	mailTemplate.update({name: inputName}, req.body, {upsert: true}, (err) => {
		if(err){
			console.log(err)
		}
	})
})

module.exports = router
