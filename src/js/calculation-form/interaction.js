// Calculate new position of distribution
function getNewDistribution(calculationStats) {
	let volumeLeft = 1.0

	let active = -1
	let inactive = -1
	let locked = -1

	// Create a copy and remove the current slider
	// const tempData = Object.assign({}, calculationStats.containerDistribution)
	const tempData = []
	const tempNames = []
	Object.keys(calculationStats.containerDistribution).forEach((el, index) => {
		tempData.push(calculationStats.containerDistribution[el])
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

function extractFormData() {
	// Extract form data and insert it into a object
	const formdata = new FormData(document.querySelector('form.calculation-form'))
	const entries = formdata.entries()
	const dataObject = { containerDistribution: {} }

	/* eslint-disable no-restricted-syntax */
	for(const entry of entries) {
		switch (entry[0]) {
		case 'keg':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
			break
		case 'bottle':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
			break
		case 'tap':
			dataObject.containerDistribution[entry[0]] = parseFloat(entry[1])
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

	return dataObject
}

module.exports = {
	getNewDistribution,
	extractFormData
}
