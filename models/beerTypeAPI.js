const mongoose = require('mongoose')
const validator = require('validator')

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
}

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

function isInputCorrect(updatedProperties) {
	const name = updatedProperties.name

	const fermenting = updatedProperties.fermenting

	const ingredient = updatedProperties.ingredient

	let validated = false
	if(
		!isEmpty({ name }) &&
		!isEmpty({ fermenting }) && isNumbers({ fermenting }) &&
		!isEmpty(ingredient) && isNumbers(ingredient)
		) {
		validated = true
	}
	return validated
}

const BeerType = mongoose.model('BeerType', beerSchema)
module.exports = BeerType

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
	BeerType.find(query, callback)
}

module.exports.getBeersByName = (fieldName, callback) => {
	const query = { name: fieldName }
	BeerType.findOne(query, callback)
}

module.exports.getBeerByType = (fieldType, callback) => {
	const query = { type: fieldType }
	BeerType.find(query, callback)
}
