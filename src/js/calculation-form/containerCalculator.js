const WATER_PER_LITER_BEER = 3.4

console.log('container calculator 2 loaded')

// Checks if we have enough water production.
// Returns a list of modules that fulfill the requirement
function getBeerProductionModules(litersOfBeer, keg, bottles) {
	let beer = litersOfBeer
	const X = 1000// Change this as needed
	let out = []
	let modules = [['A1', 1], ['B1', 2], ['B2', 2], ['B3', 2]]
	if(keg) modules = [['C1', 4]].concat(modules)
	if(bottles) modules = [['C2', 4]].concat(modules)

	let index = -1
	while(beer > 0 && index < modules.length) {
		const mod = modules[index += 1]

		if(mod[0] === 'B1') {
			out.pop()
			beer += X
		}

		beer -= mod[1] * X
		out = out.concat(mod[0])
	}
	console.log( 'Your modules are '+ out.join())
	return out
}


function checkExtraWaterProduction(modules, waterConsumption) {
	return waterConsumption
}

function getCleanWaterProduction(modules, waterConsumption) {
	return waterConsumption
}

function inputCalculating(data) {
	// const data = {
	// 	litersOfBeer: 3000,
	// 	numberOfKegs: 30, //900L ändra till %
	// 	numberOfTap: 3540, //1770L ändra till %
	// 	numberOfBottles:100, //330L ändra till %
	// 	litersOfWater: 2000 //container capacity 5000L
	// }

	let modules = []

	// Creating input data
	const waterConsumption = data.litersOfBeer * WATER_PER_LITER_BEER

	// Decide which module is needed to get enough water.
	modules = getBeerProductionModules(data.litersOfBeer)

	// Add extra water production
	if(data.waterProduction) {
		modules = checkExtraWaterProduction(modules, waterConsumption, data.waterProduction)
	}

	// Check how much extra water the module will produce
	const currentWaterproduction = getCleanWaterProduction(modules, waterConsumption)

	return { modules, cleanWaterProduction: currentWaterproduction }
}

function getModuleConfiguration(data) {
	return { modules: 'modules', water: 130, data }
}

module.exports = {
	inputCalculating,
	getModuleConfiguration,
	getBeerProductionModules
}
