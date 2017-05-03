const containerCalculator = require('./calculation-form/mainCalculator')
const formInteraction = require('./calculation-form/interaction')
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

ajax.loadJSON('/data/calculationStats')
.then((json) => {
	jsonCache = json
	const formdata = formInteraction.extractFormData()
	calcObj = containerCalculator.getCompleteCalculation(formdata, jsonCache)
	calcObj.calculationStats.distributionLock = ['tap', 'bottle']
})
.catch((msg) => {
	console.log(msg)
})

function updateDistributionSliders(event) {
	// Loading values from form
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		/* eslint-disable no-param-reassign */
		calcObj.calculationStats.containerDistribution[el.name] = parseFloat(el.value)
		/* eslint-enable no-param-reassign */
	})

	// Change tracking status
	if(event.srcElement.name !== calcObj.calculationStats.distributionLock[0]) {
		calcObj.calculationStats.distributionLock[1] = calcObj.calculationStats.distributionLock[0]
	}

	// Add current
	calcObj.calculationStats.distributionLock[0] = event.srcElement.name

	// Calculate
	calcObj.calculationStats.containerDistribution =
			formInteraction.getNewDistribution(calcObj.calculationStats)

	// Assigning values to form
	document.querySelectorAll('.calculation-form .container-distribution')
	.forEach((el) => {
		/* eslint-disable no-param-reassign */
		el.value = calcObj.calculationStats.containerDistribution[el.name]
		/* eslint-enable no-param-reassign */
	})
}

// test
document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			const formdata = formInteraction.extractFormData()
			calcObj = containerCalculator.getCompleteCalculation(formdata, jsonCache)
		})

// more test
document.querySelectorAll('.calculation-form .container-distribution')
.forEach((e) => {
	e.addEventListener('input', updateDistributionSliders, e)
})


// containerCalculator2.getBeerProductionModules(data)
containerCalculator2.getPercentage(data)
