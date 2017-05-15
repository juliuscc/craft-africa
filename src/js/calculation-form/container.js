/* Private functions
_____________________________________________________________________________*/

// Get the smallest production module for this beer production capacity
function getProductionModules(stats) {
	const productionModules = stats.containers.production
	const totalVolume = stats.volume.relative
	let returnModule
	productionModules.forEach((container) => {
		if(returnModule) {
			// Replace module if it does not fullfill the requirement
			if(returnModule.brewingCapacity < totalVolume) {
				// Calculate usage
				returnModule = container
				returnModule.usage = totalVolume / container.brewingCapacity
			}
		} else {
			// Always add the module if we don't have one
			returnModule = container
			returnModule.usage = totalVolume / container.brewingCapacity
		}
	})

	return returnModule
}

// Get the modules required for fermenting the beer
function getFermentingModules(stats, fermentingModule) {
	const fermentingModules = stats.containers.fermenting

	// Check needed capacity.
	const fermentingCapacityBrewery = fermentingModule.fermentingCapacity
	const totalCapacity = stats.volume.relative
	let neededCapacity = totalCapacity - fermentingCapacityBrewery

	// Sort out the appropriate modules
	const moduleSeries = fermentingModule.series
	const filteredFermentationModules = fermentingModules.filter(
		element => element.series === moduleSeries)

	const requiredFermentationModules = []
	// Subtract fermenting capacity for each available module
	filteredFermentationModules.forEach((container, index) => {
		if(neededCapacity > 0) {
			neededCapacity -= container.fermentingCapacity
			// This container is only partially used
			if(neededCapacity < 0) {
				container.usage = (neededCapacity / container.fermentingCapacity) + 1
			// If this is the last and it doesn't fill up the quote
			} else if(index === (filteredFermentationModules.length - 1)) {
				container.usage = (neededCapacity + container.fermentingCapacity)
									/ container.fermentingCapacity
			// We used up the capacity of this container entirely
			} else {
				container.usage = 1
			}
			requiredFermentationModules.push(container)
		}
	})

	return requiredFermentationModules
}

// Get the addon modules C1 = keg storage and C2 is Bottle machine
function getAddonsModules(stats) {
	const addonModules = stats.containers.addon

	const selectedAddons = []
	addonModules.forEach((container) => {
		if(container.choosen) {
			selectedAddons.push(container)
		}

		const vol = parseInt(stats.volume.total, 10)
		const keg = parseInt(stats.containers.threshold.kegStorage, 10)
		const bot = parseInt(stats.containers.threshold.bottleMachine, 10)
		if(container.comment.toLowerCase().indexOf('bott') !== -1) {
			if(vol > bot) {
				container.recommended = true
			} else {
				container.recommended = false
			}
		} else if(container.comment.toLowerCase().indexOf('keg') !== -1) {
			if(vol > keg) {
				container.recommended = true
			} else {
				container.recommended = false
			}
		}
	})
	return selectedAddons
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
	const fermenting = getFermentingModules(stats, production[0])
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
