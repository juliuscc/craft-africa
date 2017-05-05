const router = require('express').Router()
const passport = require('passport')
const requiresAuth = require('./admin/helper')

// Get Routes
const templatesRoute = require('./admin/templates')
const containersRoute = require('./admin/containers')
const beerRoute = require('./admin/beer')
const beerTypeRoute = require('./admin/beertype')
const emailRoute = require('./admin/email')
//const statistics = require('./admin/statistics')

// Set Routes
router.use('/emailtemplates', templatesRoute)
router.use('/containers', containersRoute)
router.use('/beer', beerRoute)
router.use('/beertype', beerTypeRoute)
router.use('/email', emailRoute)
//router.use('/statistics', statistics)

// Login stuff
router.get('/', (req, res) => {
	requiresAuth(req, res, 'index')
})

router.get('/login', (req, res) => {
	requiresAuth(req, res, 'containers', { user: req.user })
})

router.get('/signup', (req, res) => {
	res.render('admin/signup', { })
})

router.get('/statistics', (req, res) => {
	res.render('admin/statistics', { })
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/admin/login')
})

router.get('/profile', (req, res) => {
	requiresAuth(req, res, 'containers', { user: req.user })
})

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: 'containers',
	failureRedirect: 'signup',
	failureFlash: true
}))

router.post('/login', passport.authenticate('local-login', {
	successRedirect: 'containers',
	failureRedirect: 'login',
	failureFlash: true
}))

module.exports = router
