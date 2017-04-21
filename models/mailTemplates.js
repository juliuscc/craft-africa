const mongoose = require('mongoose')

const templateSchema = mongoose.Schema({
	name: String
	recipient: String,
	subject: String,
	message: String,
})

const Template = module.exports = mongoose.model('Template', templateSchema)

module.exports.createTemplate = function(newTemplate, callback) {
	newTemplate.save(callback)
}

module.exports.getTemplateById = function(id, callback) {
	const query = { id: id }
	Template.findOne(query, callback)
}

module.exports.getTemplateByName = function(name, callback) {
	const query = { name: name }
	Template.findOne(query, callback)
}

module.exports.getAllTemplates = function(callback){
	const query = {}
	Template.find(query, callback)
}
