const router = require('express').Router()
const passport = require('passport')
const requiresAuth = require('./admin/helper')

// Get Routes
const templatesRoute = require('./admin/templates')
const containersRoute = require('./admin/containers')
const beerRoute = require('./admin/defaultvalues')
const beerTypeRoute = require('./admin/beertype')
const emailRoute = require('./admin/email')
const userRoute = require('./admin/users')
// const statistics = require('./admin/statistics')

// Set Routes
router.use('/emailtemplates', templatesRoute)
router.use('/containers', containersRoute)
router.use('/defaultvalues', beerRoute)
router.use('/beertype', beerTypeRoute)
router.use('/email', emailRoute)
router.use('/users', userRoute)
// router.use('/statistics', statistics)

// Login stuff
router.get('/', (req, res) => {
	requiresAuth(req, res, 'index')
})

router.get('/login', (req, res) => {
	requiresAuth(req, res, 'login', { user: req.user })
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
