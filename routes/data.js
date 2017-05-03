const router = require('express').Router()

// Getting all the calculation stats from the database
router.get('/calculationStats', (req, res) => {
	res.json({
		litersOfBeer: 3000
	})
})

module.exports = router
