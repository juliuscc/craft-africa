const router = require('express').Router()
const requiresAuth = require('./helper')
const beerModule = require('../../models/beerAPI')

router.get('/', (req, res) => {
	console.log('tva')
	requiresAuth(req, res, 'beertype', { user: req.user })
})

router.post('/', (req, res) => {
	if(!req.body.hops) {
		res.redirect('/admin/beer')
	}
	const { hops, barley, co2, water, tap1, bottle1, keg1, tap2,
		bottle2, keg2, startValueForProduction } = req.body

	const ingredientCost = JSON.stringify({ hops, barley, co2, water })
	const defaultDistribution = JSON.stringify({ tap1, bottle1, keg1 })
	const defaultCost = JSON.stringify({ tap2, bottle2, keg2 })

	beerModule.updateBeerCollection({
		ingredientCost,
		defaultDistribution,
		defaultCost,
		startValueForProduction
	}, (err) => {
		if(err) {
			throw err
		}
	})

	res.redirect('/admin/beer')
})


module.exports = router
