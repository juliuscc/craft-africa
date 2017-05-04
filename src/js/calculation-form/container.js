/* Private functions
_____________________________________________________________________________*/

// Get the smallest production module for this beer production capacity
function getProductionModules(calculationStats) {
	return calculationStats
}

// Get the modules required for fermenting the beer
function getFermentingModules(calculationStats) {
	return calculationStats
}

// Get the addon modules
function getAddonsModules(calculationStats) {
	return calculationStats
}

/* Public interface
_____________________________________________________________________________*/

// Calculates how much water the configuration cleans each month
function getWaterCleaningCapacity(calculationStats) {
	return calculationStats
}

// Caculate the enegey production from the solar panel
function getEnergyProduction(calculationStats) {
	return calculationStats
}

// Get the cost of the current container configuration
function getCost(calculationStats) {
	return calculationStats
}

// Get a new container configuration
// Calculate the list of all modules required for this production capacity
function getConfiguration(calculationStats) {
	const production = getProductionModules(calculationStats)
	const fermenting = getFermentingModules(calculationStats)
	const addons = getAddonsModules(calculationStats)
	const all = []

	return { production, fermenting, addons, all }
}

module.exports = {
	getConfiguration,
	getWaterCleaningCapacity,
	getEnergyProduction,
	getCost
}
