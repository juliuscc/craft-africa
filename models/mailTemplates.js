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

module.exports.getTemplateById = (id, callback) => {
	const query = { id }
	Template.findOne(query, callback)
}

module.exports.getTemplateByName = (name, callback) => {
	const query = { name }
	Template.findOne(query, callback)
}

module.exports.getAllTemplates = (callback) => {
	const query = {}
	Template.find(query, callback)
}
