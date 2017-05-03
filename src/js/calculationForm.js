const containerCalculator = require('./calculation-form/mainCalculator')
const formInteraction = require('./calculation-form/formInteraction')
const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')

// const Vue = require('vue')
// This produces errors...
// const vob = new Vue({
// 	el: '#calculation-form',
// 	data: {
// 		litersOfBeer: 'lit...12345'
// 	}
// })
// console.log(vob)
const data = {
	modules: ['B1', 'B2'],
	litersOfBeer: 3000,
	numberOfKegs: 30, // 900L ändra till %
	// modules: ['A1', 'B1'],
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

let jsonCache = {}
let calcObj = {}

ajax.loadJSON('/data/calculationstats')
.then((json) => {
	jsonCache = json
	const formdata = formInteraction.extractFormData()
	calcObj = containerCalculator.getCompleteCalculation(formdata, jsonCache)

	formInteraction.updateDistributionSliders(calcObj.calculationStats)

	calcObj.calculationStats.distributionLock = ['tap', 'bottle']
})
.catch((msg) => {
	console.log(msg)
})


// test
document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			const formdata = formInteraction.extractFormData()
			calcObj = containerCalculator.getCompleteCalculation(formdata, jsonCache)
		})

// more test
document.querySelectorAll('.calculation-form .container-distribution')
.forEach((e) => {
	e.addEventListener('input', () => {
		formInteraction.updateDistributionSliders(calcObj.calculationStats, e)
	})
})


// containerCalculator2.getBeerProductionModules(data)
containerCalculator2.getPercentage(data)
