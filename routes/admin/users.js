const router = require('express').Router()
const requiresAuth = require('./helper')
const usersModule = require('../../models/user')

router.get('/', (req, res) => {
	usersModule.getAllUsers((err, users) => {
		requiresAuth(req, res, 'users', { users })
	})
})

router.post('/delete', (req, res) => {
	const data = req.body
	usersModule.removeUser(data.id, (err) => {
		if(err) {
			throw err
		}
		res.redirect('/../admin/users')
	})
})

module.exports = router
