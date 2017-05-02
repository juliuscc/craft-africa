const mongoose = require('mongoose')

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

const BeerCollection = mongoose.model('beerCollection', beerSchema)
module.exports = BeerCollection

module.exports.createBeerCollection = (newBeerCollection, callback) => {
	const beerObject = new BeerCollection(newBeerCollection)
	// console.log(newBeerCollection.ingredientCost)
	beerObject.save(callback)
}

module.exports.updateBeerCollection = (updatedProperties, callback) => {
	BeerCollection.update({}, { $set: updatedProperties }, { upsert: true }, callback)
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

		const updatedValues = {
			ingredientCost: JSON.parse(values.ingredientCost),
			defaultDistribution: JSON.parse(values.defaultDistribution),
			defaultThreshold: JSON.parse(values.defaultThreshold),
			defaultCost: JSON.parse(values.defaultCost),
			startValueForProduction: values.startValueForProduction
		}

		// console.log(updatedValues)


		callback(err, updatedValues)
	})
}
