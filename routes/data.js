const router = require('express').Router()
const containerAPI = require('./../models/containerAPI.js')
const beerAPI = require('./../models/beerAPI.js')
// const beerTypeAPI = require('./../models/beerTypeAPI.js')
// const statsAPI = require('./../models/statsAPI.js')


const Container = containerAPI.Container
const Beer = beerAPI.BeerCollection
// const BeerType = beerTypeAPI.BeerTypes
// const Stats = statsAPI.Stats

// Getting all the calculation stats from the database
// Container.getAllContainers()
router.get('/stats', (req, res) => {
	res.json({
		containers: {
			production: Container,
			fermenting: 1,
			addons: 1,
			thresholds: Beer.defaultThreshold,
			fermentingTime: 1
		},
		ingredientCost: Beer.ingredientCost
/*		volume: {
			total: Stats.volume.total
		},
		beerType: {
			options: BeerType
		}
*/
	})
})

module.exports = router

