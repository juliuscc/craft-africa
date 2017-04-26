const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/beer4africa')

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

const Container = mongoose.model('Container', containerSchema)
module.exports = Container

module.exports.createContainer = (newContainer, callback) => {
	const foo = new Container(newContainer)
	foo.save(callback)
}

module.exports.removeContainer = (fieldName, callback) => {
	const query = { name: fieldName }
	Container.remove(query, callback)
}

module.exports.updateContainerByName = (fieldName, updatedProperties, callback) => {
	Container.updated({ name: fieldName }, { $set: updatedProperties }, callback, { upsert: true })
}

module.exports.getAllContainers = (callback) => {
	const query = []
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

