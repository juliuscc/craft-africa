const mongoose = require('mongoose')
const moduleValidator = require('./moduleValidator')

const defaultValuesSchema = mongoose.Schema({
	ingredientCost: {
		type: String,
		required: true
	},
	defaultDistribution: {
		type: String,
		required: true
	},
	defaultThreshold: {
		type: String,
		required: true
	},
	defaultCost: {
		type: String,
		required: true
	},
	startValueForProduction: {
		type: Number,
		required: true
	}
})

function is100(values) {
	let percent = 0
	Object.keys(values).forEach((key) => {
		percent += values[key]
	})
	let isCorrect = false
	if(percent === 100) {
		isCorrect = true
	}
	return isCorrect
}

function isInputCorrect(updatedProperties) {
	// ingredientCost
	const ic = JSON.parse(updatedProperties.ingredientCost)
	// defaultDistribution
	const dd = JSON.parse(updatedProperties.defaultDistribution)
	// defaultThreshold
	const dt = JSON.parse(updatedProperties.defaultThreshold)
	// defaultCost
	const dc = JSON.parse(updatedProperties.defaultCost)
	// startValueForProduction
	const svfp = updatedProperties.startValueForProduction
	let validated = false
	if(!moduleValidator.isEmpty(ic) && moduleValidator.isNumbers(ic) &&
		!moduleValidator.isEmpty(dd) && moduleValidator.isNumbers(dd) &&
		!moduleValidator.isEmpty(dt) && moduleValidator.isNumbers(dt) &&
		!moduleValidator.isEmpty(dc) && moduleValidator.isNumbers(dc) &&
		!moduleValidator.isEmpty({ svfp }) && moduleValidator.isNumbers({ svfp })
		) {
		if(is100(dd)) {
			validated = true
		}
	}
	return validated
}


const DefaultValuesCollection = mongoose.model('defaultValuesCollection', defaultValuesSchema)
module.exports = DefaultValuesCollection

module.exports.createDefaultValuesCollection = (newDefaultValuesCollection, callback) => {
	const beerObject = new DefaultValuesCollection(newDefaultValuesCollection)
	beerObject.save(callback)
}

module.exports.updateDefaultValuesCollection = (updatedProperties, callback) => {
	if(isInputCorrect(updatedProperties)) {
		DefaultValuesCollection.update({}, { $set: updatedProperties }, { upsert: true }, callback)
	} else {
		// TODO
		// Send message to page somehow
		//
		//
		//
		callback()
	}
}

module.exports.getIngredientsCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getDistributionCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getThresholdCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getCostCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}
module.exports.getStartValueForProductionCollection = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, callback)
}

module.exports.getAllDefaultValuesCollections = (callback) => {
	const query = {}
	DefaultValuesCollection.findOne(query, (err, values) => {
		if(!values) {
			callback(err, {})
		} else {
			const updatedValues = {
				ingredientCost: JSON.parse(values.ingredientCost),
				defaultDistribution: JSON.parse(values.defaultDistribution),
				defaultThreshold: JSON.parse(values.defaultThreshold),
				defaultCost: JSON.parse(values.defaultCost),
				startValueForProduction: values.startValueForProduction
			}
			callback(err, updatedValues)
		}
	})
}
