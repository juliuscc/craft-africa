const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
// const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')

let jsonCache = {}
const calcObj = { stats: {}, economics: {} }

function updateForm() {
	calcObj.stats = formInteraction.extractFormData(calcObj.stats)

	calcObj.stats = stats.getCalculationStats(calcObj.stats, jsonCache)
	calcObj.economics = economics.getEconomics(calcObj.stats)

	formInteraction.updateDistributionSliders(calcObj.stats)
	formInteraction.saveFormInputs(calcObj.stats, calcObj.economics)
}

ajax.loadJSON('/data/stats')
.then((json) => {
	jsonCache = json
	// formInteraction.saveFormInputs(jsonCache, {})
	formInteraction.initForm(jsonCache, calcObj.economics)
})
// .catch((msg) => {
// 	console.log(`Error msg in calculationForm.js: ${msg}`)
// })


// test
document.querySelector('.calculation-form .calculate-button')
		.addEventListener('click', () => {
			updateForm()
			console.log('calc: ', calcObj)
		})

// more test
document.querySelectorAll('.calculation-form .container-distribution')
.forEach((e) => {
	e.addEventListener('input', () => {
		formInteraction.updateDistributionSliders(calcObj.stats, e)
		updateForm()
	})
})

document.querySelectorAll('#totalVolume')
.forEach((e) => {
	e.addEventListener('input', () => {
		updateForm()
	})
})
