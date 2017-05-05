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
			hops: ingredientsCosts.hops * beerType.current.hops,
			malt: ingredientsCosts.malt * beerType.current.malt,
			co2: ingredientsCosts.co2	* beerType.current.co2
		}

		costs.total = costs.hops + costs.malt + costs.co2

		return costs
	}
	return {}
}


module.exports = {
	getRelativeProductionVolume,
	getProductionCost
}
