const WATER_PER_LITER_BEER = 3.4

// Checks if we have enough water production. 
// Returns a list of modules that fulfill the requirement
function getBeerProductionModules (litersOfBeer) {
		// if (data.litersOfBeer < 3500)
		// return (container A)
		// else is (data.litersOfBeer < 5000)
		// 	return (container B)
		// else(data.litersOfBeer < 8000)
		// 	return(container C)
	return []
}

function checkExtraWaterProduction(modules, waterConsumption) {
	return []
}

function getCleanWaterProduction(modules, waterConsumption) {
	return 1
}

function inputCalculating (data) {
	// const data = {
	// 	litersOfBeer: 3000,
	// 	numberOfKegs: 30, //900L ändra till %
	// 	numberOfTap: 3540, //1770L ändra till %
	// 	numberOfBottles:100, //330L ändra till %
	// 	litersOfWater: 2000 //container capacity 5000L 
	// }

	const modules = []

	// Creating input data
	const waterConsumption = data.litersOfBeer * WATER_PER_LITER_BEER

	// Decide which module is needed to get enough water.
	modules = getBeerProductionModules(litersOfBeer)

	// Add extra water production
	if (data.waterProduction) {
		modules = checkExtraWaterProduction(modules, waterConsumption, data.waterProduction)
	}

	// Check how much extra water the module will produce
	const currentWaterproduction = getCleanWaterProduction(modules, waterConsumption)

	return { modules: modules, cleanWaterProduction: currentWaterproduction } 

}

module.exports = {
}
