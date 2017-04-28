const router = require('express').Router()

// Getting all the calculation stats from the database
router.get('/calculationStats', (req, res) => {
	res.json({ key1: 1, databaseKey: 1234556, random: 'thedatabase' })
})

module.exports = router
