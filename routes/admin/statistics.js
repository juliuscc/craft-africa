const router = require('express').Router()
const Logger = require('../../models/loggerAPI')
// const passport = require('passport')
// const requiresAuth = require('./admin/helper')

router.get('/', (req, res) => {
	res.render('admin/statistics')
})

router.get('/data', (req, res) => {
	Logger.getViews((err, viewsData) => {
		Logger.getCalcInput((inputData) => {
			res.json({ views: viewsData, calcInput: inputData })
		})
	})
})

module.exports = router
