const router = require('express').Router()
const auth = require('./auth')
const beerModule = require('../../models/defaultValuesAPI')

router.get('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		beerModule.getAllDefaultValuesCollections((err, values) => {
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
						kegDist: '',
						waterDist: ''
					},
					defaultThreshold: {
						bottleThresh: '',
						kegThresh: ''
					},
					productionCost: {
						tapCost: '',
						bottleCost: '',
						kegCost: ''
					},
					sellingPrice: {
						tapSell: '',
						bottleSell: '',
						kegSell: '',
						waterSell: ''
					},
					fermentingTime: '',
					productionYield: '',
					startValueForProduction: '',
					minValueForProduction: '',
					maxValueForProduction: ''
				}
				empty.username = req.user.local.name
				res.render('admin/defaultvalues', empty)
			} else {
				values.username = req.user.local.name
				res.render('admin/defaultvalues', values)
			}
		})
	})
})

router.post('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body) {
			res.redirect('/admin/defaultvalues')
		}
		const { hops, barley, co2, water, tapDist, bottleDist, kegDist, waterDist,
			bottleThresh, kegThresh, tapCost, bottleCost, kegCost,
			tapSell, bottleSell, kegSell, waterSell, fermentingTime, productionYield,
			startValueForProduction, minValueForProduction, maxValueForProduction } = req.body

		const ingredientCost = JSON.stringify({ hops, barley, co2, water })
		const defaultDistribution = JSON.stringify({ tapDist, bottleDist, kegDist, waterDist })
		const defaultThreshold = JSON.stringify({ bottleThresh, kegThresh })
		const productionCost = JSON.stringify({ tapCost, bottleCost, kegCost })
		const sellingPrice = JSON.stringify({ tapSell, bottleSell, kegSell, waterSell })

		beerModule.updateDefaultValuesCollection({
			ingredientCost,
			defaultDistribution,
			defaultThreshold,
			productionCost,
			sellingPrice,
			fermentingTime,
			productionYield,
			startValueForProduction,
			minValueForProduction,
			maxValueForProduction
		}, (err) => {
			if(err) {
				throw err
			}
		})

		res.redirect('/admin/defaultvalues')
	})
})


module.exports = router
