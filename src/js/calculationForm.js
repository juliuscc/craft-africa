const containerCalculator = require('./calculation-form/mainCalculator')
const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')
// const Vue = require('vue')

const data = {
	modules: ['B1', 'B2'],
	litersOfBeer: 3000,
	numberOfKegs: 30, // 900L ändra till %
	containerLiterAmount: {
		tap: 3023,
		bottle: 0,
		keg: 0
	},
	waterDistribution: {
		numberOfTap: 0.4,
		numberOfBottles: 0.2,
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

// containerCalculator2.getBeerProductionModules(data)
containerCalculator2.getPercentage(data)
// containerCalculator2.getModuleVal('B1')
document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			console.log('clicked')
		})

