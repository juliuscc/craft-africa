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
	beerObject.save(callback)
}

module.exports.updateBeerCollectionById = (id, updatedProperties, callback) => {
	BeerCollection.update({ _id: id }, { $set: updatedProperties }, callback, { upsert: true })
}

module.exports.getAllBeerCollections = (callback) => {
	const query = []
	BeerCollection.find(query, callback)
}
