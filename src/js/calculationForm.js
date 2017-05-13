const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
// const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')
const slider = require('./slider/main')

const calcObj = { stats: {}, economics: {} }

function updateForm() {
	formInteraction.extractFormData(calcObj.stats)

	stats.getCalculationStats(calcObj.stats)
	economics.getEconomics(calcObj.stats, calcObj.economics)

	formInteraction.updateDistributionSliders(calcObj.stats)
	formInteraction.saveFormInputs(calcObj.stats, calcObj.economics)

	slider.updateAll()
}

ajax.loadJSON('/data/stats')
.then((json) => {
	calcObj.stats = json
	stats.getCalculationStats(calcObj.stats, calcObj.economics)
	economics.getEconomics(calcObj.stats, calcObj.economics)

	formInteraction.updateDistributionSliders(calcObj.stats)
	formInteraction.saveFormInputs(calcObj.stats, calcObj.economics)

	formInteraction.initForm(calcObj.stats, calcObj.economics)
})
// .catch((msg) => {
// 	console.log(`Error msg in calculationForm.js: ${msg}`)
// })


// test
// document.querySelector('.calculation-form .calculate-button')
// 		.addEventListener('click', () => {
// 			updateForm()
// 			console.log('calc: ', calcObj)
// 		})

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

slider.init()
