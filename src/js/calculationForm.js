const containerCalculator = require('./calculation-form/mainCalculator')
const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')
// const Vue = require('vue')

const data = {
	litersOfBeer: 3000,
	numberOfKegs: 30, // 900L ändra till %
	modules: ['A1','B1'],
	containerLiterAmount: {
		tap: 5000,
		bottle: 3000,
		keg: 3000,
	},
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

// const vob = new Vue({
//	el: 'body'
// })

// console.log(vob)
console.log('Loaded calculation Form')

containerCalculator2.getBeerProductionModules(data)

document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			console.log('clicked')
		})

