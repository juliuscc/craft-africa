const mongoose = require('mongoose')

const templateSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	recipient: {
		type: String,
		required: true
	},
	admin_subject: {
		type: String,
		required: true
	},
	user_subject: {
		type: String,
		required: true
	},
	admin_message: {
		type: String,
		required: true
	},
	user_message: {
		type: String,
		required: true
	}
})

const Template = mongoose.model('Template', templateSchema)
module.exports = Template

module.exports.createTemplate = (newTemplate, callback) => {
	newTemplate.save(callback)
}
module.exports.getTemplates = (callback) => {
	Template.find({}, callback)
}

module.exports.getTemplateById = (id, callback) => {
	const query = { _id: id }
	Template.findOne(query, callback)
}

module.exports.getTemplateByName = (fieldName, callback) => {
	const query = { name: fieldName }
	Template.findOne(query, callback)
}

module.exports.updateTemplateById = (id, updatedProperties, callback) => {
	Template.update({ _id: id }, { $set: updatedProperties }, { upsert: true }, callback)
}

module.exports.getAllTemplates = (callback) => {
	const query = {}
	Template.find(query, callback)
}

module.exports.removeTemplate = (id, callback) => {
	const query = { _id: id }
	Template.remove(query, callback)
}
