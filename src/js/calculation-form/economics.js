const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function getVariableCosts(stats) {
	// volume and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		containerProductionCosts,
		volume,
		ingredientsCosts
	} = stats

	if(volume && ingredientsCosts && volume.total && containerProductionCosts) {
		const costs = {
			kegPrice: containerProductionCosts.keg * volume.keg,
			tapPrice: containerProductionCosts.tap * volume.tap,
			bottlePrice: containerProductionCosts.bottle * volume.bottle,
			ingredients: ingredientsCosts.total * volume.total
		}

		costs.total = costs.kegPrice + costs.tapPrice + costs.bottlePrice + costs.ingredients

		return costs
	}
	return {}
}

// Get the fixed costs for producing the current setup.
function getFixedCosts(stats) {
	// Modules needs to be gathered before
	if(stats.modules) {
		const costs = {
			rent: container.getCost(stats)
		}

		return costs
	}
	return {}
}

// Calculate the total income from distribution and prices
function getIncome(stats) {
	// volume needs to be calculated before
	const { containerLiterPrice, volume } = stats

	const incomes = {}

	if(containerLiterPrice && volume) {
		const kegPrice 		= containerLiterPrice.keg * volume.keg
		const tapPrice 		= containerLiterPrice.tap * volume.tap
		const bottlePrice 	= containerLiterPrice.bottle * volume.bottle

		incomes.total = kegPrice + tapPrice + bottlePrice
		return incomes
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
