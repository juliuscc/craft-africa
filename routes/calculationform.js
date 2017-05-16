const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	const variables = {}
	variables.minTotalVolume = 20
	variables.maxTotalVolume = 45000
	variables.totalVolume = 50
	variables.title = 'Build your own brand'
	res.render('calculationform', variables)
})

router.post('/', (req, res) => {
	const variables = req.body
	variables.minTotalVolume = 20
	variables.maxTotalVolume = 10000

	if(!variables.totalVolume) {
		variables.totalVolume = 50
	}

	variables.title = 'Build your own brand'
	res.render('calculationform', variables)
})

module.exports = router
