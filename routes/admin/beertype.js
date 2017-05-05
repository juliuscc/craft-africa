const router = require('express').Router()
const requiresAuth = require('./helper')
const beerType = require('../../models/beerTypeAPI')

router.get('/', (req, res) => {
	beerType.createBeer({
		name: 'swag',
		fermenting: 32,
		ingredient: {
			hops: 1,
			malt: 2,
			co2: 3
		}
	}, (err) => {
		if(err) {
			throw err
		}
	})
	console.log('HEEEEEEEEEEEEEEEEEEEEEEHEE')
	beerType.getAllBeers((err, beertypes) => {
		if(err) {
			throw err
		}
		requiresAuth(req, res, 'beertype', beertypes)
	})
})

router.post('/', (req, res) => {
	res.redirect('/admin/beer')
})


module.exports = router
