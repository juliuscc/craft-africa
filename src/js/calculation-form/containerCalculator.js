const WATER_PER_LITER_BEER = 9

console.log('container calculator 2 loaded')

function IllegalArgumentException(Msg) {
	this.message = Msg
}


// Add percentage calculation
// Liters of keg/bottles
function getBeerProductionModules(calculationStats) {
	let tap = calculationStats.containerLiterAmount.tap
	const keg = calculationStats.containerLiterAmount.keg
	const bottle = calculationStats.containerLiterAmount.bottle
	if(tap < 0 || keg < 0 || keg > 4000 || bottle < 0 || bottle > 4000) throw new IllegalArgumentException('illegal argument, liters can not be negative or more than 4000 except tap')
	const X = 1000// Change this as needed
	let out = []
	const modules = [['A1', 1], ['B1', 2], ['B2', 2], ['B3', 2]]
	let index = -1
	while(tap > 0) {
		const mod = modules[index += 1]
		if(mod === undefined) throw new IllegalArgumentException('tap liters to high')

		if(mod[0] === 'B1') {
			out.pop()
			tap += X
		}

		tap -= mod[1] * X
		out = out.concat(mod[0])
	}

	if(keg > 0) out = out.concat(['C1'])
	if(bottle > 0) out = out.concat(['C2'])

	return out
}

function getModuleVal(container, containers = [['A1', 1], ['B1', 2], ['B2', 2], ['B3', 2]]) {
	const containerList = containers
	if(containerList === []) { throw new IllegalArgumentException('Container not found') }
	if(containerList[0][0] === container) {
		return containerList[0][1]
	}

	else {
		containerList.shift()
		console.log(containerList)
		return getModuleVal(container, containerList)
	}
}

function getPercentage(calculationStats) {
	let tap = calculationStats.containerLiterAmount.tap
	const keg = calculationStats.containerLiterAmount.keg
	const bottle = calculationStats.containerLiterAmount.bottle
	const modules = calculationStats.modules
	if(modules === undefined) throw new IllegalArgumentException('Modules not defined in data object')

	let out = []
	const X = 1000// Change this as needed
	let liters = 0
	let index = 0
	while(index < modules.length) {
		const mod = modules[index]
		liters = X * getModuleVal(mod)
		out = out.concat([[mod, Math.min(tap / liters, 1)]])
		tap -= liters
		index += 1
	}
	out = out.concat([['C1', keg / 4000], ['C2', bottle / 4000]])
	return out
}

function getTotalCost(calculationStats){

function getTotalCost(calculationStats) {
	const modules = calculationStats.modules
	return modules.reduce((acc, container) => acc + container[1], 0)
}

function getElectricityConsumption(calculationStats) {
	const { tap, keg, bottle } = calculationStats.containerLiterDistribution
	const totalLiters = tap + keg + bottles
	return totalLiters * 0.3
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
	getBeerProductionModules,
	getPercentage,
	getModuleVal
}
