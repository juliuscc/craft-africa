const router = require('express').Router()
const Logger = require('../../models/loggerAPI')
// const passport = require('passport')
// const requiresAuth = require('./admin/helper')

router.get('/', (req, res) => {
	res.render('admin/statistics', { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 })
})

router.get('/data', (req, res) => {
	const params = req.query
	Logger.getViews((err, viewsData) => {
		Logger.getCalcInput(new Date(params.dateL),
		new Date(params.dateT), new Date(params.dateK), new Date(params.dateB), (inputData) => {
			res.json({ views: viewsData, calcInput: inputData })
		})
	})
})

module.exports = router
