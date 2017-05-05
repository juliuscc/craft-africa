/*
	!!!!!!!!!!!!!!!!!!!!!!!!!!!
	!! This file is not used !!
	!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

function IllegalArgumentException(Msg) {
	this.message = Msg
}

// Add percentage calculation
// Liters of keg/bottles
function getBeerProductionModules(stats) {
	let tap = stats.volume.tap
	const keg = stats.volume.keg
	const bottle = stats.volume.bottle

	// Remove hard coded values
	if(keg > 4000 || bottle > 4000) {
		throw new IllegalArgumentException('illegal argument, liters can not be negative or more than 4000 except tap')
	}

	const X = 1000 // Change this as needed
	let out = []
	const modules = [{ name: 'A1', production_volume: 3000, storage: 3000 }] // , ['A1', 1], ['B1', 2], ['B2', 2], ['B3', 2]]
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

	containerList.shift()
	return getModuleVal(container, containerList)
}

function getPercentage(stats) {
	let tap = stats.volume.tap
	const keg = stats.volume.keg
	const bottle = stats.volume.bottle
	const modules = stats.modules
	if(modules === undefined) throw new IllegalArgumentException('Modules not defined in data object')

	let out = []
	const X = 1000 // Change this as needed
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

function getTotalCost(stats) {
	const modules = stats.modules

	if(!modules) {
		throw new IllegalArgumentException('No modules found')
	}

	return modules.reduce((acc, container) => acc + container[1], 0)
}

function getElectricityConsumption(stats) {
	const { tap, keg, bottle } = stats.volume
	const totalLiters = tap + keg + bottle
	return totalLiters * 0.3
}

module.exports = {
	getBeerProductionModules,
	getPercentage,
	getModuleVal,
	getTotalCost,
	getElectricityConsumption
}
