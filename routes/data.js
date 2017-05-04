const router = require('express').Router()

// Getting all the calculation stats from the database
router.get('/stats', (req, res) => {
	res.json({
		modules: ['B1', 'B2'],
		volume: {
			total: 3000
		},
		// numberOfKegs: 30, // 900L ändra till %
		// modules: ['A1', 'B1'],
		containerLiterAmount: {
			tap: 3023,
			bottle: 0,
			keg: 0
		},
		distribution: {
			tap: 0.4,
			bottle: 0.2,
			keg: 0.2 // container capacity 5000L
		}
	})
})

module.exports = router
