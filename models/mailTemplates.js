const mongoose = require('mongoose')
const moduleValidator = require('./moduleValidator')

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

function isInputCorrect(updatedProperties) {
	console.log(updatedProperties)

	const name = updatedProperties.name
	const recipient = updatedProperties.recipient
	const adminSubject = updatedProperties.admin_subject
	const adminMessage = updatedProperties.admin_message
	const userSubject = updatedProperties.admin_subject
	const userMessage = updatedProperties.user_message


	let validated = false
	if(!moduleValidator.isEmpty({ name }) &&
		!moduleValidator.isEmpty({ recipient }) &&
		!moduleValidator.isEmpty({ adminSubject }) &&
		!moduleValidator.isEmpty({ adminMessage }) &&
		!moduleValidator.isEmpty({ userSubject }) &&
		!moduleValidator.isEmpty({ userMessage })
		) {
		validated = true
	}
	return validated
}


const Template = mongoose.model('Template', templateSchema)
module.exports = Template

module.exports.createTemplate = (emailData, callback) => {
	const emailObject = new Template(emailData)
	emailObject.save(callback)
}

module.exports.createTemplate = (data, callback) => {
	if(isInputCorrect(data)) {
		const containerObject = new Template(data)
		containerObject.save(callback)
	} else {
		callback('Input incorrect')
	}
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
