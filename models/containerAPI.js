const mongoose = require('mongoose')
const validator = require('validator')

const containerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

function isNumbers(values) {
	// console.log('may')
	// console.log(values)
	// const temp = '14'
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
			// console.log(key, values[key])
		// if(validator.isInt(defaultDistribution.tapDist)){
		// }
		})
	}
	return areIntegers
	// values.forEach(v => console.log(v))
}

function isEmpty(values) {
	let empty = false
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isEmpty(temp[key])) {
					empty = true
				}
			}
		})
	} else {
		empty = true
	}
	return empty
}

function isInputCorrect(updatedProperties) {
	// ingredientCost
	const ic = JSON.parse(updatedProperties.ingredientCost)

	// defaultDistribution
	const dd = JSON.parse(updatedProperties.defaultDistribution)

	// defaultThreshold
	const dt = JSON.parse(updatedProperties.defaultThreshold)

	// defaultCost
	const dc = JSON.parse(updatedProperties.defaultCost)

	// startValueForProduction
	const svfp = updatedProperties.startValueForProduction

	console.log(svfp)

	let validated = false
	if(!isEmpty(ic) && isNumbers(ic) &&
		!isEmpty(dd) && isNumbers(dd) &&
		!isEmpty(dt) && isNumbers(dt) &&
		!isEmpty(dc) && isNumbers(dc) &&
		!isEmpty({ svfp }) && isNumbers({ svfp })
		) {
		validated = true
	}
	return validated
}

const Container = mongoose.model('Container', containerSchema)
module.exports = Container

module.exports.createContainer = (newContainer, callback) => {
	const containerObject = new Container(newContainer)
	containerObject.save(callback)
}

module.exports.removeContainer = (id, callback) => {
	const query = { _id: id }
	Container.remove(query, callback)
}

module.exports.updateContainerById = (id, updatedProperties, callback) => {
	Container.update({ _id: id }, { $set: updatedProperties }, { upsert: true }, callback)
}

module.exports.getAllContainers = (callback) => {
	const query = {}
	Container.find(query, callback)
}

module.exports.getContainerByName = (fieldName, callback) => {
	const query = { name: fieldName }
	Container.findOne(query, callback)
}

module.exports.getContainerByType = (fieldType, callback) => {
	const query = { type: fieldType }
	Container.find(query, callback)
}
