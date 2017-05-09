// Get the "relative" production volume.
// This can be used to estimate fermenting needs
function getRelativeProductionVolume(stats) {
	// How many percent of the timeunit used in the containers
	// does the current beer make up.
	// If beer fermenting time is greater, we will scale up the
	// relative volume.
	const scaleFactor = stats.beerType.current.fermentingTime / stats.containers.fermentingTime

	return stats.volume.total * scaleFactor
}

// Get the costs for resources per liter beer
function getProductionCost(stats) {
	// Variables from db or changed by user
	const { ingredientsCosts, beerType } = stats

	if(ingredientsCosts && beerType.current) {
		const costs = {
			hops: ingredientsCosts.hops * beerType.current.ingredient.hops,
			malt: ingredientsCosts.malt * beerType.current.ingredient.malt,
			co2: ingredientsCosts.co2	* beerType.current.ingredient.co2
		}

		costs.total = costs.hops + costs.malt + costs.co2

		return costs
	}
	return {}
}

// Return the beerType object with the default beer type selected.
function getDefaultBeerType(stats) {
	return stats.beerType.options[0]
}

module.exports = {
	getRelativeProductionVolume,
	getProductionCost,
	getDefaultBeerType
}
