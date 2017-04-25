const mongoose = require('mongoose')

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
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

const container = mongoose.model('Container', containerSchema)
module.exports = container

module.exports.createContainer = (newContainer, callback) => {
	newContainer.save(callback)
}

module.exports.removeContainer = (fieldName, callback) => {
	const query = { name: fieldName }
	container.remove(query, callback)
}

module.exports.updateContainerByName = (fieldName, updatedProperties, callback) => {
	container.updated({ name: fieldName }, { $set: updatedProperties }, callback, { upsert: true })
}

module.exports.getAllContainers = (callback) => {
	const query = {}
	container.find(query, callback)
}

module.exports.getContainerByName = (fieldName, callback) => {
	const query = { name: fieldName }
	container.findOne(query, callback)
}

module.exports.getContainerByType = (fieldType, callback) => {
	const query = { type: fieldType }
	container.find(query, callback)
}

