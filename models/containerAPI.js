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
	series: {
		type: String,
		require: true
	},
	price: {
		type: Number,
		required: true
	},
	fermentingCapacity: {
		type: Number
	},
	storageCapacity: {
		type: Number
	},
	waterProduction: {
		type: Number
	},
	beerProduction: {
		type: Number
	}
})

function isNumbers(values) {
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
	const name = updatedProperties.name

	const type = updatedProperties.type

	const price = updatedProperties.price

	const size = updatedProperties.size

	let validated = false
	if(
		!isEmpty({ type }) &&
		!isEmpty({ price }) && isNumbers({ price }) &&
		!isEmpty({ size }) && isNumbers({ size })
		) {
		validated = true
	}
	return validated
}

const Container = mongoose.model('Container', containerSchema)
module.exports = Container

module.exports.createContainer = (newContainer, callback) => {
	if(isInputCorrect(newContainer)) {
		const containerObject = new Container(newContainer)
		containerObject.save(callback)
	} else {
		callback()
	}
}

module.exports.removeContainer = (id, callback) => {
	const query = { _id: id }
	Container.remove(query, callback)
}

module.exports.updateContainerById = (id, updatedProperties, callback) => {
	if(isInputCorrect(updatedProperties)) {
		Container.update({ _id: id }, { $set: updatedProperties }, { upsert: true }, callback)
	} else {
		callback()
	}
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

