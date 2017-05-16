const express = require('express')
const defaultValuesAPI = require('./../models/defaultValuesAPI')

const router = express.Router()

router.get('/', (req, res) => {
	const variables = {}

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
})

router.post('/', (req, res) => {
	res.redirect('/calculationform')
	// res.render('calculationform', variables)
})

module.exports = router
