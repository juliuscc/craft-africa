const containerCalculator = require('./containerCalculator')

/* Calculating base data
__________________________________________________________________________________*/

// Get the number of liters of each container type.
function getContainerLiterAmount(calculationStats) {
	// Both values are selected by the form
	const { litersOfBeer, containerDistribution } = calculationStats

	if(litersOfBeer && containerDistribution) {
		return {
			tap: litersOfBeer * containerDistribution.tap,
			keg: litersOfBeer * containerDistribution.keg,
			bottle: litersOfBeer * containerDistribution.bottle
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

/* Economics
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function getVariableCosts(calculationStats) {
	// containerLiterAmount and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		containerProductionCosts,
		containerLiterAmount,
		ingredientsCosts,
		litersOfBeer
	} = calculationStats

	if(containerLiterAmount && ingredientsCosts && litersOfBeer && containerProductionCosts) {
		const costs = {
			kegPrice: containerProductionCosts.keg * containerLiterAmount.keg,
			tapPrice: containerProductionCosts.tap * containerLiterAmount.tap,
			bottlePrice: containerProductionCosts.bottle * containerLiterAmount.bottle,
			ingredients: ingredientsCosts.total * litersOfBeer
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
			rent: containerCalculator.getTotalCost(calculationStats.modules)
		}

		return costs
	}
	return {}
}

// Calculate the total income from distribution and prices
function getIncome(calculationStats) {
	// containerLiterAmount needs to be calculated before
	const { containerLiterPrice, containerLiterAmount } = calculationStats

	const incomes = {}

	if(containerLiterPrice && containerLiterAmount) {
		const kegPrice 		= containerLiterPrice.keg * containerLiterAmount.keg
		const tapPrice 		= containerLiterPrice.tap * containerLiterAmount.tap
		const bottlePrice 	= containerLiterPrice.bottle * containerLiterAmount.bottle

		incomes.total = kegPrice + tapPrice + bottlePrice
		return incomes
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
	stats.containerLiterAmount = getContainerLiterAmount(stats)

	// Ingredientscosts
	stats.ingredientsCosts = getIngredientsCosts(stats)

	// Aquirering modules
	containerCalculator.getModuleConfiguration(stats)

	return stats
}

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

// Create the main output data-object
function getCompleteCalculation(inputData, defaultData) {
	const data = {}

	data.calculationStats = getCalculationStats(inputData, defaultData)
	data.economics = getEconomics(data.calculationStats)
	return data
}

/* Exporting module
__________________________________________________________________________________*/

module.exports = {
	getCompleteCalculation,
	getCalculationStats,
	getEconomics
}
