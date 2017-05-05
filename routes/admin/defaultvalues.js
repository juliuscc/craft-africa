const router = require('express').Router()
const requiresAuth = require('./helper')
const beerModule = require('../../models/defaultValuesAPI')

router.get('/', (req, res) => {
	beerModule.getAllDefaultValuesCollections((err, values) => {
		// requiresAuth(req, res, 'beertype')
		if(!values.ingredientCost) {
			const empty = {
				ingredientCost: {
					hops: '',
					barley: '',
					co2: '',
					water: ''
				},
				defaultDistribution: {
					tapDist: '',
					bottleDist: '',
					kegDist: ''
				},
				defaultThreshold: {
					bottleThresh: '',
					kegThresh: ''
				},
				defaultCost: {
					tapCost: '',
					bottleCost: '',
					kegCost: ''
				},
				startValueForProduction: ''
			}

			requiresAuth(req, res, 'defaultValues', empty)
		} else {
			requiresAuth(req, res, 'defaultValues', values)
		}
	})
	// res.render('editbeertype')
})

router.post('/', (req, res) => {
	if(!req.body) {
		res.redirect('/admin/defaultvalues')
	}
	const { hops, barley, co2, water, tapDist, bottleDist, kegDist, bottleThresh, kegThresh, tapCost,
		bottleCost, kegCost, startValueForProduction } = req.body

	const ingredientCost = JSON.stringify({ hops, barley, co2, water })
	const defaultDistribution = JSON.stringify({ tapDist, bottleDist, kegDist })
	const defaultThreshold = JSON.stringify({ bottleThresh, kegThresh })
	const defaultCost = JSON.stringify({ tapCost, bottleCost, kegCost })

	beerModule.updateDefaultValuesCollection({
		ingredientCost,
		defaultDistribution,
		defaultThreshold,
		defaultCost,
		startValueForProduction
	}, (err) => {
		if(err) {
			throw err
		}
	})

	res.redirect('/admin/defaultvalues')
})


module.exports = router
