const router = require('express').Router()
const passport = require('passport')
const requiresAuth = require('./admin/helper')
const templates = require('./admin/templates')
const containers = require('./admin/containers')
const beer = require('./admin/beer')

router.use('/emailtemplates', templates)
router.use('/containers', containers)
router.use('/beer', beer)

router.get('/', (req, res) => {
	requiresAuth(req, res, 'index')
})

router.get('/login', (req, res) => {
	requiresAuth(req, res, 'profile', { user: req.user })
})

router.get('/signup', (req, res) => {
	res.render('Admin/signup', { })
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/profile', (req, res) => {
	requiresAuth(req, res, 'profile', { user: req.user })
})

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: 'profile',
	failureRedirect: 'signup',
	failureFlash: true

}))

router.post('/login', passport.authenticate('local-login', {
	successRedirect: 'profile',
	failureRedirect: 'login',
	failureFlash: true

}))

module.exports = router
