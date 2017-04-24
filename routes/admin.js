const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('handletemplates', {
		template: 'hello',
		recipient: 'mail@foo.bar',
		subject: 'a subject',
		message: 'lorem ipsum dolore.......'
	})
})

router.get('/edit', (req, res) => {
	res.render('handletemplates')
})

module.exports = router
