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
	res.render('admin/signup', { })
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/admin/login')
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

const router = require('express').Router()
const passport = require('passport')
const requiresAuth = require('./admin/helper')
const templates = require('./admin/templates')
const containers = require('./admin/containers')
const beer = require('./admin/beer')