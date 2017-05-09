const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function getVariableCosts(stats) {
	// volume and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		productionCost,
		volume,
		beerType
	} = stats
	const costs = {}

	if(volume && beerType.current.cost && volume.total && productionCost) {
		if(beerType.current.cost && volume.total) {
			costs.ingredients = beerType.current.cost.total * volume.total
		} else {
			costs.ingredients = 0
		}

		if(productionCost && volume) {
			costs.kegPrice = productionCost.keg * volume.keg
			costs.tapPrice = productionCost.tap * volume.tap
			costs.bottlePrice = productionCost.bottle * volume.bottle
		} else {
			costs.kegPrice = 0
			costs.tapPrice = 0
			costs.bottlePrice = 0
		}

		costs.total = costs.kegPrice + costs.tapPrice + costs.bottlePrice + costs.ingredients

		return costs
	}
	return {
		ingredients: 0,
		kegPrice: 0,
		tapPrice: 0,
		bottlePrice: 0,
		total: 0
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
		const income = {
			kegPrice: sellingPrice.keg * volume.keg,
			tapPrice: sellingPrice.tap * volume.tap,
			bottlePrice: sellingPrice.bottle * volume.bottle
		}
		income.total = income.kegPrice + income.tapPrice + income.bottlePrice
		return income
	}
	return {}
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
