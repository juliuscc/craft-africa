const container = require('./container')
const beerTypes = require('./beerTypes')

/* Private
__________________________________________________________________________________*/

// Get the number of liters of each container type.
function calcDistributionVolume(stats) {
	// Both values are selected by the form
	const { volume, distribution } = stats

	if(volume.total && distribution) {
		volume.tap = volume.total * distribution.tap
		volume.keg = volume.total * distribution.keg
		volume.bottle = volume.total * distribution.bottle
	}

	return stats
}

// Get the "relative" production volume.
// This can be used to estimate fermenting needs
function calcRelativeProductionVolume(stats) {
	// How many percent of the timeunit used in the containers
	// does the current beer make up.
	// If beer fermenting time is greater, we will scale up the
	// relative volume.
	let scaleFactor = stats.beerType.current.fermentingTime / stats.containers.fermentingTime

	// Adding the facility production yield
	scaleFactor /= stats.containers.productionYield

	stats.volume.relative = stats.volume.total * scaleFactor

	return stats
}

/* Public interface
__________________________________________________________________________________*/

// Get the stats used in the calculation
function getCalculationStats(stats) {
	// Add the current beer type
	if(!stats.beerType.current) {
		stats.beerType.current = beerTypes.getDefaultBeerType(stats)
	}
	stats.beerType.current.cost = beerTypes.getProductionCost(stats)

	// Calculating the amount of each type (in liters)
	calcDistributionVolume(stats)
	calcRelativeProductionVolume(stats)

	// Aquirering modules
	stats.containers.current = container.getConfiguration(stats)

	// Calculate how much energy and water the modules produce
	stats.electricityProduction = container.getEnergyProduction(stats)
	stats.waterProduction = container.getWaterCleaningCapacity(stats)

	// Add distribution lock
	stats.distributionLock = ['tap', 'bottle']
	return stats
}
/* Exporting module
__________________________________________________________________________________*/

module.exports = {
	getCalculationStats
}
