const router = require('express').Router()
const containerAPI = require('./../models/containerAPI')
const beerAPI = require('./../models/defaultValuesAPI')
const defaultThresholdAPI = require('./../models/defaultValuesAPI')

function sendErrorJSON(res) {
	res.json({ error: true })
}

// Getting all the calculation stats from the database
router.get('/stats', (req, res) => {
	containerAPI.getAllContainers((err, containers) => {
		if(err) {
			console.log('error: Can\'t get contaners')
			sendErrorJSON(res)
		} else {
			defaultThresholdAPI.getAllDefaultValuesCollections((err2, defaultValues) => {
				if(err) {
					console.log('error: Could not load default values')
					sendErrorJSON(res)
				} else {
					// Create container object
					const containerObject = {}
					containers.forEach((container) => {
						containerObject[container.type].push(container)
					})
					containerObject.threshold = defaultValues.defaultThreshold
					containerObject.fermentingTime = defaultValues.fermentingTime

					res.json({
						containers: containerObject,
						ingredientCost: beerAPI.ingredientCost
					})
				}
			})
		}
	})

/*
	const productionContainers = Container.getContainerByType('production')
	const fermentingContainers = Container.getContainerByType('fermenting')
	const addonsContainers = Container.getContainerByType('addon')

	const containerThresholds = defaultThreshold.getDefaultThreshold()
*/
})

module.exports = router

