const mongoose = require('mongoose')
const validator = require('validator')

const beerSchema = mongoose.Schema({
	ingredientCost: {
		type: String,
		required: true
	},
	defaultDistribution: {
		type: String,
		required: true
	},
	defaultThreshold: {
		type: String
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

function isEmpty(values) {
	let empty = false
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isEmpty(temp[key])) {
					empty = true
				}
			}
		})
	} else {
		empty = true
	}
	return empty
}

function isNumbers(values) {
	let areIntegers = true
	if(values) {
		const temp = values
		Object.keys(temp).forEach((key) => {
			if(!Number.isInteger(temp[key])) {
				if(validator.isInt(temp[key])) {
					temp[key] = parseInt(temp[key], 10)
				} else {
					areIntegers = false
				}
			}
		})
	}
	return areIntegers
	// values.forEach(v => console.log(v))
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

	console.log(svfp)

	let validated = false
	if(!isEmpty(ic) && isNumbers(ic) &&
		!isEmpty(dd) && isNumbers(dd) &&
		!isEmpty(dt) && isNumbers(dt) &&
		!isEmpty(dc) && isNumbers(dc) &&
		!isEmpty({ svfp }) && isNumbers({ svfp })
		) {
		validated = true
	}
	return validated
}


const BeerCollection = mongoose.model('beerCollection', beerSchema)
module.exports = BeerCollection

module.exports.createBeerCollection = (newBeerCollection, callback) => {
	const beerObject = new BeerCollection(newBeerCollection)
	// console.log(newBeerCollection.ingredientCost)
	beerObject.save(callback)
}

module.exports.updateBeerCollection = (updatedProperties, callback) => {
	if(isInputCorrect(updatedProperties)) {
		console.log('validated')
		BeerCollection.update({}, { $set: updatedProperties }, { upsert: true }, callback)
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
	BeerCollection.findOne(query, callback)
}
module.exports.getDistributionCollection = (callback) => {
	const query = {}
	BeerCollection.findOne(query, callback)
}
module.exports.getCostCollection = (callback) => {
	const query = {}
	BeerCollection.findOne(query, callback)
}
module.exports.getStartValueForProductionCollection = (callback) => {
	const query = {}
	BeerCollection.findOne(query, callback)
}


module.exports.getAllBeerCollections = (callback) => {
	const query = {}
	BeerCollection.findOne(query, (err, values) => {
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
			// console.log(updatedValues)
			callback(err, updatedValues)
		}
	})
}
