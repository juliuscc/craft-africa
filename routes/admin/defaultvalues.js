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
						kegDist: ''
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
						kegSell: ''
					},
					startValueForProduction: ''
				}
				res.render('admin/defaultvalues', empty)
			} else {
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
		const { hops, barley, co2, water, tapDist, bottleDist, kegDist,
			bottleThresh, kegThresh, tapCost,
			bottleCost, kegCost, tapSell, bottleSell, kegSell,
			startValueForProduction } = req.body

		const ingredientCost = JSON.stringify({ hops, barley, co2, water })
		const defaultDistribution = JSON.stringify({ tapDist, bottleDist, kegDist })
		const defaultThreshold = JSON.stringify({ bottleThresh, kegThresh })
		const productionCost = JSON.stringify({ tapCost, bottleCost, kegCost })
		const sellingPrice = JSON.stringify({ tapSell, bottleSell, kegSell })

		beerModule.updateDefaultValuesCollection({
			ingredientCost,
			defaultDistribution,
			defaultThreshold,
			productionCost,
			sellingPrice,
			startValueForProduction
		}, (err) => {
			if(err) {
				throw err
			}
		})

		res.redirect('/admin/defaultvalues')
	})
})


module.exports = router
