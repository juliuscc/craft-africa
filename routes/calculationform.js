const express = require('express')
const defaultValuesAPI = require('./../models/defaultValuesAPI')
const browserCheck = require('./helper/browserCheck')

const router = express.Router()

router.get('/', (req, res) => {
	if(browserCheck.isSupportedBrowser(req)) {
		const variables = { title: 'Build your brand' }
		defaultValuesAPI.getAllDefaultValuesCollections((err2, defaultValues) => {
			if(err2) {
				variables.minTotalVolume = 20
				variables.maxTotalVolume = 45000
				variables.totalVolume = 50
			} else {
				variables.minTotalVolume = defaultValues.minValueForProduction
				variables.maxTotalVolume = defaultValues.maxValueForProduction
				variables.totalVolume = defaultValues.startValueForProduction
			}
			res.render('calculationform', variables)
		})
	} else {
		res.redirect('/update/')
	}
})

router.post('/', (req, res) => {
	res.redirect('/calculationform')
	// res.render('calculationform', variables)
})

module.exports = router
