const router = require('express').Router()
const requiresAuth = require('./helper')
const usersModule = require('../../models/user')
const passport = require('passport')

router.get('/', (req, res) => {
	if(req.user) {
		usersModule.getAllUsers((err, users) => {
			requiresAuth(req, res, 'users', { users })
		})
	} else {
		res.redirect('/admin')
	}
})

router.post('/', passport.authenticate('local-signup', {
	successRedirect: 'users',
	failureRedirect: 'users',
	failureFlash: true
}))

router.post('/delete', (req, res) => {
	if(req.user) {
		const data = req.body
		usersModule.removeUser(data.id, (err) => {
			if(err) {
				throw err
			}
			res.redirect('/../admin/users')
		})
	} else {
		res.redirect('/admin')
	}
})

module.exports = router
