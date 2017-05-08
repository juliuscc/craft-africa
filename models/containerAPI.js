const mongoose = require('mongoose')
const moduleValidator = require('./moduleValidator')

const containerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
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
	brewingCapacity: {
		type: Number
	},
	waterProduction: {
		type: Number
	},
	electricityProduction: {
		type: Number
	}
})

const Container = mongoose.model('Container', containerSchema)
module.exports = Container

function isInputCorrect(updatedProperties) {
	const name = updatedProperties.name
	const type = updatedProperties.type
	const series = updatedProperties.series
	const price = updatedProperties.price

	let validated = false
	if(
		!moduleValidator.isEmpty({ name }) &&
		!moduleValidator.isEmpty({ type }) &&
		!moduleValidator.isEmpty({ series }) &&
		!moduleValidator.isEmpty({ price }) && moduleValidator.isNumbers({ price })
		) {
		validated = true
	}
	return validated
}

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
