const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	const variables = {}
	variables.minTotalVolume = 20
	variables.maxTotalVolume = 45000
	variables.totalVolume = 50
	res.render('calculationform', variables)
})

router.post('/', (req, res) => {
	console.log(req.body.input1)
	console.log(req.body)

	const variables = req.body
	variables.minTotalVolume = 20
	variables.maxTotalVolume = 10000


	if(!variables.totalVolume) {
		variables.totalVolume = 50
	}

	console.log('Variables: ')
	console.log(variables)
	res.render('calculationform', variables)
})

module.exports = router
