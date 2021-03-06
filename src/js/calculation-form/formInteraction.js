// Calculate new position of distribution
function getNewDistribution(stats) {
	let volumeLeft = 1.0

	let active = -1
	let inactive = -1
	let locked = -1

	// Create a copy and remove the current slider
	const tempData = []
	const tempNames = []
	Object.keys(stats.distribution).forEach((el, index) => {
		tempData.push(stats.distribution[el])
		tempNames.push(el)

		// Extracting key status
		if(el === stats.distributionLock[0]) {
			locked = index
		} else if(el === stats.distributionLock[1]) {
			inactive = index
		} else {
			active = index
		}
	})

	volumeLeft -= tempData[locked]

	// Try to remove everything from the slider moved least resently

	// Calculate the updated value
	volumeLeft -= tempData[inactive]
	tempData[active] = volumeLeft

	if(tempData[active] < 0) {
		tempData[inactive] += tempData[active]
		tempData[active] = 0
	}

	// Create the return data
	const data = {}
	tempNames.forEach((element, index) => {
		data[element] = tempData[index]
	})

	return data
}

function extractFormData(stats) {
	// Extract form data and insert it into a object
	const entries = [...document.querySelectorAll('.calculation-form input')]
	.filter(node => (node.type !== 'submit') && (node.type !== 'button'))
	.map(node => [node.name, node.value])
	stats.distribution = {}
	stats.volume = {}

	/* eslint-disable no-restricted-syntax */
	for(const entry of entries) {
		switch (entry[0]) {
		case 'keg':
			stats.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'bottle':
			stats.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'tap':
			stats.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'totalVolume':
			stats.volume.total = parseInt(entry[1], 10)
			break

		default:
			if(entry[1] % 1 === 0) {
				stats[entry[0]] = parseInt(entry[1], 10)
			} else {
				stats[entry[0]] = parseFloat(entry[1])
			}
			break
		}
	}
	/* eslint-enable no-restricted-syntax */

	return stats
}

function loadFormInputs(stats) {
	// Loading values from form
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		stats.distribution[el.name] = parseFloat(el.value)
	})
}

function saveFormInputs(stats, economics) {
	// Assigning values to sliders
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		/* eslint-disable no-param-reassign */
		el.value = stats.distribution[el.name]
		/* eslint-enable no-param-reassign */
	})

	if(economics) {
		if(economics.profit) {
			document.querySelector('.profit').innerHTML = economics.profit
		}

		if(economics.fixedCosts && economics.variableCosts) {
			document.querySelector('.output').innerHTML =
			`Fixed: ${economics.fixedCosts.total}
			 Variable: ${economics.variableCosts.total}
			`
		}
	}
}

function initForm(stats, economics) {
	// Assigning to main slider
	document.querySelector('#totalVolume').value = stats.volume.total
	saveFormInputs(stats, economics)
}

function updateDistributionSliders(stats, event) {
	loadFormInputs(stats)

	// Change tracking status
	if(event) {
		if(event.name !== stats.distributionLock[0]) {
			stats.distributionLock[1] = stats.distributionLock[0]
		}
		// Add current
		stats.distributionLock[0] = event.name
	} else {
		stats.distributionLock = ['tap', 'bottle']
	}

	// Calculate
	stats.distribution =
			getNewDistribution(stats)
}


module.exports = {
	loadFormInputs,
	initForm,
	saveFormInputs,
	getNewDistribution,
	updateDistributionSliders,
	extractFormData
}
