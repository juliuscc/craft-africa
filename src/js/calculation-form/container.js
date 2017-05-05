/* Private functions
_____________________________________________________________________________*/

// Get the smallest production module for this beer production capacity
function getProductionModules(stats) {
	// const productionModules = stats.containers.production

	const productionModules = [
		{ name: 'A1', beerProduction: 300, cost: 8000, fermenting: 5000 },
		{ name: 'A2', beerProduction: 300, cost: 4000, fermenting: 5000 },
		{ name: 'A3', beerProduction: 300, cost: 4000, fermenting: 5000 },
		{ name: 'B1', beerProduction: 600, cost: 12000, fermenting: 5000 },
		{ name: 'B2', beerProduction: 900, cost: 6000, fermenting: 10000 },
		{ name: 'B3', beerProduction: 12000, cost: 6000, fermenting: 15000 }
	]
	const totalVolume = stats.volume.total
	let returnModule
	productionModules.forEach((container) => {
		if(totalVolume <= container.beerProduction) {
			if(!returnModule) {
				returnModule = container
			}
		}
	})

	return [returnModule]
	// Hannes fixing error handeling
}

// Get the modules required for fermenting the beer
function getFermentingModules(stats) {
	// const fermentingModules = stats.containers.fermenting
	const fermentingModules = getProductionModules.productionModules.fermenting
	const chosenProductionModule = getProductionModules(stats)

	const fermentingCapacityBrewery = chosenProductionModule.fermenting
	const quote = (stats.container.fermentingTime * 7) / 30

	const totalCapacity = stats.volume.total * quote
	const neededCapacity = totalCapacity - fermentingCapacityBrewery

	return neededCapacity
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

function test() {
	console.log(getFermentingModules({ volume: { total: 901 }, container: { fermentingTime: 20 } }))
}

test()
