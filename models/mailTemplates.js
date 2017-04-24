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
	subject: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
})

const Template = mongoose.model('Template', templateSchema)
module.exports = Template

module.exports.createTemplate = (newTemplate, callback) => {
	newTemplate.save(callback)
}

module.exports.getTemplateById = (fieldId, callback) => {
	const query = { id: fieldId }
	Template.findOne(query, callback)
}

module.exports.getTemplateByName = (fieldName, callback) => {
	const query = { name: fieldName }
	Template.findOne(query, callback)
}

module.exports.editByName = (fieldName, object, callback) => {
	const query = { name: fieldName }
	Template.update(query, object, callback)
}

module.exports.getAllTemplates = (callback) => {
	const query = {}
	Template.find(query, callback)
}
