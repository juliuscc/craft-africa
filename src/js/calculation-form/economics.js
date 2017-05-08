const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function getVariableCosts(stats) {
	// volume and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		productionCosts,
		volume,
		beerType
	} = stats
	const costs = {}

// TODO fix production cost and current beer cost

	if(volume && beerType.current.cost && volume.total && productionCosts) {
		if(beerType.current.cost && volume.total) {
			costs.ingredients = beerType.current.cost * volume.total
		} else {
			costs.ingredients = NaN
		}

		if(productionCosts && volume.tap && volume.bottle && volume.keg) {
			costs.kegPrice = productionCosts.keg * volume.keg
			costs.tapPrice = productionCosts.tap * volume.tap
			costs.bottlePrice = productionCosts.bottle * volume.bottle
		} else {
			costs.kegPrice = NaN
			costs.tapPrice = NaN
			costs.bottlePrice = NaN
		}

		costs.total = costs.kegPrice + costs.tapPrice + costs.bottlePrice + costs.ingredients

		return costs
	}
	return {
		ingredients: NaN,
		kegPrice: NaN,
		tapPrice: NaN,
		bottlePrice: NaN,
		total: NaN
	}
}

// Get the fixed costs for producing the current setup.
function getFixedCosts(stats) {
	// Containers needs to be gathered before
	if(stats.containers.current) {
		const costs = {
			rent: container.getCost(stats)
		}

		costs.total = costs.rent

		return costs
	}
	return {
		rent: NaN,
		total: NaN
	}
}

// Calculate the total income from distribution and prices
function getIncome(stats) {
	// volume needs to be calculated before
	const { sellingPrice, volume } = stats
	if(sellingPrice && volume) {
		const kegPrice 		= sellingPrice.keg * volume.keg
		const tapPrice 		= sellingPrice.tap * volume.tap
		const bottlePrice 	= sellingPrice.bottle * volume.bottle

		return kegPrice + tapPrice + bottlePrice
	}
	return NaN
}


/* public interface
__________________________________________________________________________________*/


// Get the revenue distribution
function getEconomics(stats) {
	const economics = {
		incomes: getIncome(stats).total,
		fixedCosts: getFixedCosts(stats).total,
		variableCosts: getVariableCosts(stats).total
	}
	economics.profit = economics.incomes - economics.fixedCosts - economics.variableCosts

	return economics
}

module.exports = {
	getEconomics
}
