const router = require('express').Router()
const requiresAuth = require('./helper')

router.get('/', (req, res) => {
	requiresAuth(req, res, 'handletemplates', {
		template: 'hello',
		recipient: 'mail@foo.bar',
		subject: 'a subject',
		message: 'lorem ipsum dolore.......'
	})
})

router.get('/edit', (req, res) => {
	requiresAuth(req, res, 'handletemplates')
})


module.exports = router
