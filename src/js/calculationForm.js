const containerCalculator = require('./calculation-form/mainCalculator')
const ajax = require('./ajax')
const Vue = require('vue')

const data = {
	litersOfBeer: 3000,
	numberOfKegs: 30, // 900L ändra till %
	waterDistribution: {
		numberOfTap: 0.4, // 1770L ändra till %
		numberOfBottles: 0.2, // 330L ändra till %
		litersOfWater: 0.2 // container capacity 5000L
	}
}

data.test = true

const inputData = {
	key1: 999, random: 'randomkey'
}

let jsonCache = {}

ajax.loadJSON('/data/calculationStats')
.then((json) => {
	jsonCache = json
	console.log(containerCalculator.getCompleteCalculation(inputData, json))
})
.catch((msg) => {
	console.log(msg)
})

jsonCache.hej = ''

const vob = new Vue({
	el: 'body'
})

console.log(vob)

document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			console.log('clicked')
		})

