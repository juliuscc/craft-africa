const router = require('express').Router()
// const passport = require('passport')
// const requiresAuth = require('./admin/helper')

router.get('/', (req, res) => {
	console.log("statistics route")
	res.render('admin/statistics')
})


module.exports = router
