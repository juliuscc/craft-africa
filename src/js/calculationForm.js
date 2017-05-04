const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
// const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')

let jsonCache = {}
const calcObj = {}

ajax.loadJSON('/data/stats')
.then((json) => {
	jsonCache = json

	const formdata = formInteraction.extractFormData()

	calcObj.stats = stats.getCalculationStats(formdata, jsonCache)
	calcObj.economics = economics.getEconomics(calcObj)

	calcObj.stats.distributionLock = ['tap', 'bottle']

	formInteraction.updateDistributionSliders(calcObj.stats)
})
.catch((msg) => {
	console.log(msg)
})


// test
document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			const formdata = formInteraction.extractFormData()
			calcObj.stats = stats.getCalculationStats(formdata, jsonCache)
			calcObj.economics = economics.getEconomics(calcObj)

			// containerCalculator2.getBeerProductionModules(data)
			// containerCalculator2.getPercentage(calcObj.calculationStats)
			console.log('calc: ', calcObj)
		})

// more test
document.querySelectorAll('.calculation-form .container-distribution')
.forEach((e) => {
	e.addEventListener('input', () => {
		formInteraction.updateDistributionSliders(calcObj.stats, e)
	})
})
