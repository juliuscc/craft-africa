const router = require('express').Router()
const passport = require('passport')

// Get Routes
const templatesRoute = require('./admin/templates')
const containersRoute = require('./admin/containers')
const beerRoute = require('./admin/defaultvalues')
const beerTypeRoute = require('./admin/beertype')
const emailRoute = require('./admin/email')
const userRoute = require('./admin/users')
const statistics = require('./admin/statistics')

// Set Routes
router.use('/emailtemplates', templatesRoute)
router.use('/containers', containersRoute)
router.use('/defaultvalues', beerRoute)
router.use('/beertype', beerTypeRoute)
router.use('/email', emailRoute)
router.use('/users', userRoute)
router.use('/statistics', statistics)

// Login stuff
router.get('/', (req, res) => {
	if(req.user) {
		res.redirect('/admin/containers')
	} else {
		res.render('admin/login')
	}
})

router.get('/login', (req, res) => {
	if(req.user) {
		res.redirect('/admin/containers')
	} else {
		res.render('admin/login')
	}
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/admin/login')
})

router.post('/login', passport.authenticate('local-login', {
	successRedirect: 'containers',
	failureRedirect: 'login',
	failureFlash: true
}))

module.exports = router
