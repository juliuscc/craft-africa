const router = require('express').Router()
const requiresAuth = require('./helper')
const usersModule = require('../../models/user')

router.get('/', (req, res) => {
	usersModule.getAllUsers((err, users) => {
		requiresAuth(req, res, 'users', { users })
	})
})

module.exports = router
