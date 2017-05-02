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

module.exports.getAllBeerCollections = (callback) => {
	const query = {}
	BeerCollection.find(query, callback)
}
