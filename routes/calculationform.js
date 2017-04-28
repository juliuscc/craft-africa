const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	const variables = {}
	variables.minLitersOfBeer = 20
	variables.maxLitersOfBeer = 10000
	variables.litersOfBeer = 50
	res.render('calculationform', variables)
})

router.post('/', (req, res, next) => {
	console.log(req.body.input1)
	console.log(req.body)

	const variables = req.body
	variables.minLitersOfBeer = 20
	variables.maxLitersOfBeer = 10000


	if(!variables.litersOfBeer) {
		variables.litersOfBeer = 50
	}

	console.log('Variables: ')
	console.log(variables)
	res.render('calculationform', variables)
})

module.exports = router
