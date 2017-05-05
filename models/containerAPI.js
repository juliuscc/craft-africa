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

function isempty() {
	let isCorrect = false
	if(true) {
		isCorrect = true
	}
	return isCorrect
}

function isInputCorrect(updatedProperties) {
	const price = JSON.parse(updatedProperties.price)

	const size = JSON.parse(updatedProperties.size)

	const validated = false
	if(isNumbers(price) &&
		isNumbers(size)) {
		return true
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
