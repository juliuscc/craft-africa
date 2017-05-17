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
	getProductionCost,
	getDefaultBeerType
}
