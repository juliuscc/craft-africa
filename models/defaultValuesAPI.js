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
	productionCost: {
		type: String,
		required: true
	},
	sellingPrice: {
		type: String,
		required: true
	},
	fermentingTime: {
		type: Number,
		required: true
	},
	productionYield: {
		type: Number,
		required: true
	},
	startValueForProduction: {
		type: Number,
		required: true
	}
})

// function is100(values) {
// 	let percent = 0.0
// 	Object.keys(values).forEach((key) => {
// 		percent += Number.parseFloat(values[key])
// 	})
// 	let isCorrect = false
// 	if(Math.round(percent) === 100) {
// 		isCorrect = true
// 	}
// 	return isCorrect
// }

function isInputCorrect(updatedProperties) {
	// ingredientCost
	const ic = JSON.parse(updatedProperties.ingredientCost)
	// defaultDistribution
	const dd = JSON.parse(updatedProperties.defaultDistribution)
	// defaultThreshold
	const dt = JSON.parse(updatedProperties.defaultThreshold)
	// productionCost
	const dc = JSON.parse(updatedProperties.productionCost)
	// sellingPrice
	const sp = JSON.parse(updatedProperties.sellingPrice)
	// fermentingTime
	const ft = updatedProperties.fermentingTime
	// Production yield
	const py = updatedProperties.productionYield
	// startValueForProduction
	const svfp = updatedProperties.startValueForProduction
	let validated = false
	if(!moduleValidator.isEmpty(ic) && moduleValidator.isNumbers(ic) &&
		!moduleValidator.isEmpty(dd) && moduleValidator.isNumbers(dd) &&
		!moduleValidator.isEmpty(dt) && moduleValidator.isNumbers(dt) &&
		!moduleValidator.isEmpty(dc) && moduleValidator.isNumbers(dc) &&
		!moduleValidator.isEmpty(sp) && moduleValidator.isNumbers(sp) &&
		!moduleValidator.isEmpty({ ft }) && moduleValidator.isNumbers({ ft }) &&
		!moduleValidator.isEmpty({ py }) && moduleValidator.isNumbers({ py }) &&
		!moduleValidator.isEmpty({ svfp }) && moduleValidator.isNumbers({ svfp })
		) {
		validated = true
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
		callback('invalid input')
	}
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
				productionCost: JSON.parse(values.productionCost),
				sellingPrice: JSON.parse(values.sellingPrice),
				fermentingTime: values.fermentingTime,
				productionYield: values.productionYield,
				startValueForProduction: values.startValueForProduction
			}
			callback(err, updatedValues)
		}
	})
}
