const container = require('./container')
const beerTypes = require('./beerTypes')

/* Private
__________________________________________________________________________________*/

// Get the number of liters of each container type.
function getDistributionVolume(stats) {
	// Both values are selected by the form
	const { volume, distribution } = stats

	if(volume.total && distribution) {
		return {
			tap: volume.total * distribution.tap,
			keg: volume.total * distribution.keg,
			bottle: volume.total * distribution.bottle
		}
	}
	return {}
}

/* Public interface
__________________________________________________________________________________*/

// Get the stats used in the calculation
function getCalculationStats(inputData, defaultData) {
	const stats = defaultData

	// extending the object
	Object.assign(stats, inputData)

	// Calculating the amount of each type (in liters)
	stats.volume = getDistributionVolume(stats)

	// Aquirering modules
	stats.containers = container.getConfiguration(stats)

	// Add the beer unit costs
	stats.beertype.current = stats.beertype.options[0] // Todo change this?
	stats.beertype.current.costs = beerTypes.getProductionCost()

	return stats
}
/* Exporting module
__________________________________________________________________________________*/

module.exports = {
	getCalculationStats
}
