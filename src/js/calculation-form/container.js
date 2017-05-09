/* Private functions
_____________________________________________________________________________*/

// Get the smallest production module for this beer production capacity
function getProductionModules(stats) {
	const productionModules = stats.containers.production
	const totalVolume = stats.volume.total
	let returnModule
	productionModules.forEach((container) => {
		if(totalVolume <= container.brewingCapacity) {
			if(!returnModule) {
				returnModule = container
			}
		}
	})

	return returnModule
	// Hannes fix error handeling.
}

// Get the modules required for fermenting the beer
function getFermentingModules(stats) {
	const fermentingModules = stats.containers.fermenting

	// Check needed capacity.
	const chosenProductionModule = getProductionModules(stats)
	const fermentingCapacityBrewery = chosenProductionModule.fermentingCapacity
	const totalCapacity = stats.volume.relative
	let neededCapacity = totalCapacity - fermentingCapacityBrewery

	// Sort out the appropriate modules
	const moduleSeries = chosenProductionModule.series
	const filteredFermentationModules = fermentingModules.filter(
		element => element.series === moduleSeries)

	const requiredFermentationModules = []
	// Subtract fermenting capacity for each available module
	filteredFermentationModules.forEach((container) => {
		if(neededCapacity > 0) {
			neededCapacity -= container.fermentingCapacity
			requiredFermentationModules.push(container)
		}
	})

	return requiredFermentationModules
}

// Get the addon modules C1 = keg storage and C2 is Bottle machine
function getAddonsModules(stats) {
	const addonModules = stats.containers.addon

	const requiredAddonsModules = []
	addonModules.forEach((container) => {
		if(container.choosen) {
			requiredAddonsModules.push(container)
		}
	})
	return requiredAddonsModules
}

/* Public interface
_____________________________________________________________________________*/

// Calculates how much water the configuration cleans each month
function getWaterCleaningCapacity(stats) {
	const modulesWater = stats.containers.current.all

	let totalWaterProduction = 0
	modulesWater.forEach((container) => {
		totalWaterProduction += container.waterProduction
	})

	return totalWaterProduction
}

// Caculate the enegey production from the solar panel
function getEnergyProduction(stats) {
	const modulesEnergy = stats.containers.current.all

	let totalEnergyProduction = 0
	modulesEnergy.forEach((container) => {
		totalEnergyProduction += container.electricityProduction
	})

	return totalEnergyProduction
}

// Get a new container configuration
// Calculate the list of all modules required for this production capacity
function getConfiguration(stats) {
	const production = [getProductionModules(stats)]
	const fermenting = getFermentingModules(stats)
	const addons = getAddonsModules(stats)

	// concatinating arrays
	// const all = production.concat(fermenting).concat(addons)
	const all = (production.concat(fermenting)).concat(addons)

	return { production, fermenting, addons, all }
}

// Get the cost of the current container configuration
function getCost(stats) {
	const modules = stats.containers.current.all

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
