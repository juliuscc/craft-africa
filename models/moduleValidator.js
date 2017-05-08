const validator = require('validator')

module.exports.isNumbers = (values) => {
	let areIntegers = true
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isInt(temp[key])) {
					temp[key] = parseInt(temp[key], 10)
				} else {
					areIntegers = false
				}
			}
		})
	}
	return areIntegers
}

module.exports.isEmpty = (values) => {
	let empty = false
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(temp[key]) {
				if(!Number.isInteger(temp[key])) {
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
