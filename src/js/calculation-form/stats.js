const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the number of liters of each container type.
function getvolume(calculationStats) {
	// Both values are selected by the form
	const { volume, distribution } = calculationStats

	if(volume.total && distribution) {
		return {
			tap: volume.total * distribution.tap,
			keg: volume.total * distribution.keg,
			bottle: volume.total * distribution.bottle
		}
	}
	return {}
}

// Get the costs for resources per liter beer
function getIngredientsCosts(calculationStats) {
	// Variables from db or changed by user
	const { ingredientsCosts, resourceUsage } = calculationStats

	if(ingredientsCosts && resourceUsage) {
		const costs = {
			hops: ingredientsCosts.hops * resourceUsage.hops,
			malt: ingredientsCosts.malt * resourceUsage.malt,
			co2: ingredientsCosts.co2	* resourceUsage.co2
		}

		costs.total = costs.hops + costs.malt + costs.co2

		return costs
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
	stats.volume = getvolume(stats)

	// Ingredientscosts
	stats.ingredientsCosts = getIngredientsCosts(stats)

	// Aquirering modules
	stats.containers = container.getConfiguration(stats)

	return stats
}
/* Exporting module
__________________________________________________________________________________*/

module.exports = {
	getCalculationStats
}
