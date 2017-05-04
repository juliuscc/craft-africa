const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function getVariableCosts(calculationStats) {
	// volume and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		containerProductionCosts,
		volume,
		ingredientsCosts
	} = calculationStats

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
function getFixedCosts(calculationStats) {
	// Modules needs to be gathered before
	if(calculationStats.modules) {
		const costs = {
			rent: container.getCost(calculationStats)
		}

		return costs
	}
	return {}
}

// Calculate the total income from distribution and prices
function getIncome(calculationStats) {
	// volume needs to be calculated before
	const { containerLiterPrice, volume } = calculationStats

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
function getEconomics(calculationStats) {
	const economics = {
		incomes: getIncome(calculationStats).total,
		fixedCosts: getFixedCosts(calculationStats).total,
		variableCosts: getVariableCosts(calculationStats).total
	}

	economics.profit = economics.incomes - economics.fixedCosts - economics.variableCosts

	return economics
}

module.exports = {
	getEconomics
}
