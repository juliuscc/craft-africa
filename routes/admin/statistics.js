const router = require('express').Router()
const Logger = require('../../models/loggerAPI')
// const passport = require('passport')
// const requiresAuth = require('./admin/helper')

router.get('/', (req, res) => {
	res.render('admin/statistics')
})

router.get('/data', (req, res) => {
	Logger.getViews((err, viewsData) => {
		console.log('Viewsdata:')
		console.log(viewsData)
		res.json({ views: viewsData })
	})
})

module.exports = router
