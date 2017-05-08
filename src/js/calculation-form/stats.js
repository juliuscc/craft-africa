const container = require('./container')
const beerTypes = require('./beerTypes')

/* Private
__________________________________________________________________________________*/

// Get the number of liters of each container type.
function getDistributionVolume(stats) {
	// Both values are selected by the form
	const { volume, distribution } = stats
	const volumeData = {}

	Object.assign(volumeData, volume)

	if(volumeData.total && distribution) {
		volumeData.tap = volume.total * distribution.tap
		volumeData.keg = volume.total * distribution.keg
		volumeData.bottle = volume.total * distribution.bottle
	}

	return volumeData
}

/* Public interface
__________________________________________________________________________________*/

// Get the stats used in the calculation
function getCalculationStats(inputData, defaultData) {
	const stats = defaultData

	// extending the object
	Object.assign(stats, inputData)

	// Calculating the amount of each type (in liters)
	console.log(stats)
	stats.volume = getDistributionVolume(stats)

	// Aquirering modules
	stats.containers.current = container.getConfiguration(stats)

	// Calculate how much energy and water the modules produce
	stats.electricityProduction = container.getEnergyProduction(stats)
	stats.waterProduction = container.getWaterCleaningCapacity(stats)

	// Add the beer unit costs
	if(!stats.beerType.current) {
		stats.beerType.current = beerTypes.getDefaultBeerType(stats)
	}
	stats.beerType.current.costs = beerTypes.getProductionCost(stats)

	// Add distribution lock
	stats.distributionLock = ['tap', 'bottle']

	return stats
}
/* Exporting module
__________________________________________________________________________________*/

module.exports = {
	getCalculationStats
}
