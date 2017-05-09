const validator = require('validator')

module.exports.isNumbers = (values) => {
	let areFloats = true
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			// console.log(temp[key])
			if(Number.isNaN(temp[key])) {
				// console.log('krax', validator.isInt(temp[key]))
				if(validator.isNumeric(temp[key])) {
					// console.log('before: ', temp[key])
					temp[key] = parseFloat(temp[key], 10)
					// console.log('after: ', temp[key])
				} else {
					areFloats = false
				}
			}
		})
	}
	/* console.log('number1: ', !Number.isNaN(35))
	console.log('number2: ', !Number.isNaN(35.5))
	console.log('number3: ', !Number.isNaN('35'))*/
	console.log('floats: ', areFloats)
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
	console.log('empty: ', !empty)
	return empty
}

