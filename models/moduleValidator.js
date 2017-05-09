const validator = require('validator')

module.exports.isNumbers = (values) => {
	let areFloats = true
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(Number.isNaN(temp[key])) {
				if(validator.isNumeric(temp[key])) {
					temp[key] = parseFloat(temp[key], 10)
				} else {
					areFloats = false
				}
			}
		})
	}
	return areFloats
}

module.exports.isEmpty = (values) => {
	let empty = false
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(temp[key]) {
				if(Number.isNaN(temp[key])) {
					if(validator.isEmpty(temp[key])) {
						empty = true
					}
				}
			} else {
				empty = true
			}
		})
	} else {
		empty = true
	}
	return empty
}

