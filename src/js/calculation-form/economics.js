const container = require('./container')

/* Private
__________________________________________________________________________________*/

// Get the costs for producing the current amounts.
function calcVariableCosts(stats, economics) {
	// volume and ingredientscosts needs to be calculated. The rest is from form or db
	const {
		productionCost,
		volume,
		beerType
	} = stats

	if(!economics.variableCosts) {
		economics.variableCosts = {}
	}

	const { variableCosts } = economics

	if(volume && beerType.current.cost && volume.total && productionCost) {
		if(beerType.current.cost && volume.total) {
			variableCosts.ingredients = beerType.current.cost.total * volume.total
		} else {
			variableCosts.ingredients = 0
		}

		if(productionCost && volume) {
			variableCosts.kegPrice = productionCost.keg * volume.keg
			variableCosts.tapPrice = productionCost.tap * volume.tap
			variableCosts.bottlePrice = productionCost.bottle * volume.bottle
		} else {
			variableCosts.kegPrice = 0
			variableCosts.tapPrice = 0
			variableCosts.bottlePrice = 0
		}

		variableCosts.total = variableCosts.kegPrice +
								variableCosts.tapPrice +
								variableCosts.bottlePrice +
								variableCosts.ingredients
	}
	return economics
}

// Get the fixed costs for producing the current setup.
function calcFixedCosts(stats, economics) {
	// Containers needs to be gathered before
	if(!economics.fixedCosts) {
		economics.fixedCosts = {}
	}
	const { fixedCosts } = economics
	if(stats.containers.current) {
		fixedCosts.rent = container.getCost(stats)
		fixedCosts.total = fixedCosts.rent
	}
	return economics
}

// Calculate the total income from distribution and prices
function calcIncome(stats, economics) {
	if(!economics.incomes) {
		economics.incomes = {}
	}

	// volume needs to be calculated before
	const { sellingPrice, volume } = stats
	const { incomes } = economics
	if(sellingPrice && volume) {
		incomes.kegPrice = sellingPrice.keg * volume.keg
		incomes.tapPrice = sellingPrice.tap * volume.tap
		incomes.bottlePrice = sellingPrice.bottle * volume.bottle
		incomes.total = incomes.kegPrice + incomes.tapPrice + incomes.bottlePrice
	}
	return economics
}


/* public interface
__________________________________________________________________________________*/


// Get the revenue distribution
function getEconomics(stats, economics) {
	calcIncome(stats, economics)
	calcFixedCosts(stats, economics)
	calcVariableCosts(stats, economics)

	economics.profit = economics.incomes.total -
						economics.fixedCosts.total -
						economics.variableCosts.total

	// Check containers
	let accepted = true
	stats.containers.current.all.forEach((containerModule) => {
		if(containerModule.usage > 1) {
			accepted = false
		}
	})

	if(!accepted) {
		economics.fixedCosts.rent = '-'
		economics.fixedCosts.total = '-'
		economics.profit = '-'
	}

	return economics
}

module.exports = {
	getEconomics
}
