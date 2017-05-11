// Calculate new position of distribution
function getNewDistribution(calculationStats) {
	let volumeLeft = 1.0

	let active = -1
	let inactive = -1
	let locked = -1

	// Create a copy and remove the current slider
	const tempData = []
	const tempNames = []
	Object.keys(calculationStats.distribution).forEach((el, index) => {
		tempData.push(calculationStats.distribution[el])
		tempNames.push(el)

		// Extracting key status
		if(el === calculationStats.distributionLock[0]) {
			locked = index
		} else if(el === calculationStats.distributionLock[1]) {
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

	if(tempData[active] > 1) {
		console.log('Something went wrong. Larger than 1')
	} else if(tempData[active] < 0) {
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
	const formdata = new FormData(document.querySelector('.calculation-form'))
	const entries = formdata.entries()
	const dataObject = { distribution: {}, volume: {} }

	/* eslint-disable no-restricted-syntax */
	for(const entry of entries) {
		switch (entry[0]) {
		case 'keg':
			dataObject.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'bottle':
			dataObject.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'tap':
			dataObject.distribution[entry[0]] = parseFloat(entry[1])
			break
		case 'totalVolume':
			dataObject.volume.total = parseInt(entry[1], 10)
			break

		default:
			if(entry[1] % 1 === 0) {
				dataObject[entry[0]] = parseInt(entry[1], 10)
			} else {
				dataObject[entry[0]] = parseFloat(entry[1])
			}
			break
		}
	}
	/* eslint-enable no-restricted-syntax */

	Object.assign(stats, dataObject)

	return dataObject
}

function loadFormInputs(calculationStats) {
	const stats = calculationStats

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
		} else {
			console.log('no profit')
		}

		if(economics.fixedCosts && economics.variableCosts) {
			document.querySelector('.output').innerHTML =
			`Fixed: ${economics.fixedCosts.total}
			 Variable: ${economics.variableCosts.total}
			`
		}
	} else {
		console.log('no economics')
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
