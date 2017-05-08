const mongoose = require('mongoose')
const moduleValidator = require('./moduleValidator')

const beerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	fermenting: {
		type: Number,
		required: true
	},
	ingredient: {
		type: String,
		required: true
	}
})

const BeerType = mongoose.model('BeerType', beerSchema)
module.exports = BeerType

function isInputCorrect(updatedProperties) {
	const name = updatedProperties.name

	const fermenting = updatedProperties.fermenting

	const ingredient = JSON.parse(updatedProperties.ingredient)

	let validated = false
	if(
		!moduleValidator.isEmpty({ name }) &&
		!moduleValidator.isEmpty({ fermenting }) && moduleValidator.isNumbers({ fermenting }) &&
		!moduleValidator.isEmpty(ingredient) && moduleValidator.isNumbers(ingredient.hops) &&
		moduleValidator.isNumbers(ingredient.malt) && moduleValidator.isNumbers(ingredient.co2)
		) {
		validated = true
	}
	return validated
}

module.exports.createBeer = (newBeer, callback) => {
	if(isInputCorrect(newBeer)) {
		const containerObject = new BeerType(newBeer)
		containerObject.save(callback)
	} else {
		callback()
	}
}

module.exports.removeBeer = (id, callback) => {
	const query = { _id: id }
	BeerType.remove(query, callback)
}

module.exports.updateBeerById = (id, updatedProperties, callback) => {
	if(isInputCorrect(updatedProperties)) {
		BeerType.update({ _id: id }, { $set: updatedProperties }, { upsert: true }, callback)
	} else {
		callback()
	}
}

module.exports.getAllBeers = (callback) => {
	const query = {}
	BeerType.find(query, (err, values) => {
		if(!values) {
			callback(err, {})
		} else {
			const updatedValues = values.map((_, index) => ({
				_id: values[index]._id,
				name: values[index].name,
				fermenting: values[index].fermenting,
				ingredient: JSON.parse(values[index].ingredient)
			}))
			callback(err, updatedValues)
		}
	})
}

module.exports.getBeersByName = (fieldName, callback) => {
	const query = { name: fieldName }
	BeerType.findOne(query, callback)
}

module.exports.getBeerByType = (fieldType, callback) => {
	const query = { type: fieldType }
	BeerType.find(query, callback)
}
