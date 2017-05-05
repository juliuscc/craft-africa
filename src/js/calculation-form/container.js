/* Private functions
_____________________________________________________________________________*/

// Get the smallest production module for this beer production capacity
function getProductionModules(stats) {
	// const productionModules = stats.containers.production

	const productionModules = [
		{ name: 'A1', brewingCapacity: 9000, cost: 8000, fermenting: 5000 },
		{ name: 'B1', brewingCapacity: 18000, cost: 12000, fermenting: 5000 }
	]
	const totalVolume = stats.volume.total
	let returnModule
	productionModules.forEach((container) => {
		if(totalVolume <= container.brewingCapacity) {
			if(!returnModule) {
				returnModule = container
			}
		}
	})

	// Shoud we return array instead?
	return returnModule
	// Hannes fix error handeling.
}

// Get the modules required for fermenting the beer
function getFermentingModules(stats) {
	const fermentingModules = [{ name: 'A2', cost: 4000, fermenting: 5000 },
		{ name: 'A3', cost: 4000, fermenting: 5000 },
		{ name: 'B2', cost: 6000, fermenting: 10000 },
		{ name: 'B3', cost: 6000, fermenting: 15000 }
	]
// Check needed capacity.
	const chosenProductionModule = getProductionModules(stats)
	const fermentingCapacityBrewery = chosenProductionModule.fermenting
	const totalCapacity = stats.volume.relative
	let neededCapacity = totalCapacity - fermentingCapacityBrewery

// Sort out the appropriate modules
	const identifyingTypeChar = chosenProductionModule.name.charAt(0)
	const filteredFermentationModules = fermentingModules.filter((element) => {
		return element.name.charAt(0) === identifyingTypeChar
	})

	let choosenFermentationModules = []
// Subtract fermenting capacity for each available module
	filteredFermentationModules.forEach((container) => {
		if(neededCapacity > 0) {
			neededCapacity -= container.fermenting
			choosenFermentationModules.push(container)
		}
	})

	return choosenFermentationModules
}

// Get the addon modules
function getAddonsModules(stats) {
	return stats
}

/* Public interface
_____________________________________________________________________________*/

// Calculates how much water the configuration cleans each month
function getWaterCleaningCapacity(stats) {
	return stats
}

// Caculate the enegey production from the solar panel
function getEnergyProduction(stats) {
	return stats
}

// Get a new container configuration
// Calculate the list of all modules required for this production capacity
function getConfiguration(stats) {
	const production = getProductionModules(stats)
	const fermenting = getFermentingModules(stats)
	const addons = getAddonsModules(stats)

	// concatinating arrays
	const all = production.concat(fermenting).concat(addons)

	return { production, fermenting, addons, all }
}

// Get the cost of the current container configuration
function getCost(stats) {
	const modules = getConfiguration(stats).all

	let cost = 0
	modules.forEach((container) => {
		cost += container.price
	})

	return cost
}

module.exports = {
	getConfiguration,
	getWaterCleaningCapacity,
	getEnergyProduction,
	getCost
}

module.exports.test = function () {
	return getFermentingModules({ volume: { total: 7000, relative: 18000 } })
}

