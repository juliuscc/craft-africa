const router = require('express').Router()
const Logger = require('../../models/loggerAPI')
const requiresAuth = require('./helper')

router.get('/', (req, res) => {
	requiresAuth(req, res, 'statistics', { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1 })
})

router.get('/data', (req, res) => {
	if(req.user) {
		const params = req.query
		Logger.getViews((err, viewsData) => {
			if(err) {
				res.json({ views: {}, inputData: '' })
			} else {
				Logger.getCalcInput(new Date(params.dateL),
				new Date(params.dateT), new Date(params.dateK), new Date(params.dateB), (inputData) => {
					res.json({ views: viewsData, calcInput: inputData })
				})
			}
		})
	}
})

module.exports = router
