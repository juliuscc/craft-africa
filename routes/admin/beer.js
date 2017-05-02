const router = require('express').Router()
const requiresAuth = require('./helper')
const beerModule = require('../../models/beerAPI')

router.get('/beer', (req, res) => {
	beerModule.getAllBeerCollections((err, res1) => {
		console.log(res1)
	})

	res.render('editbeertype')
})

router.post('/beer', (req, res) => {
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

router.get('/beertype', (req, res) => {
	requiresAuth(req, res, 'editbeertype', { user: req.user })
})

module.exports = router
