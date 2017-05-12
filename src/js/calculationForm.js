/* eslint-disable */
// import Vue from 'vue'
// import { Bar, mixins } from 'vue-chartjs'

const { Bar, mixins } = VueChartJs
const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
const ajax = require('./ajax')
const { reactiveProp } = mixins
// const chart = require('chart.js')


const calcObj = { stats: {}, economics: {} }
// const containerCalculator2 = require('./calculation-form/containerCalculator')

function updateForm() {
	formInteraction.extractFormData(calcObj.stats)

	stats.getCalculationStats(calcObj.stats)
	economics.getEconomics(calcObj.stats, calcObj.economics)

	formInteraction.updateDistributionSliders(calcObj.stats)
	formInteraction.saveFormInputs(calcObj.stats, calcObj.economics)
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

let data = [40, 39, 10]
console.log(data)

Vue.component('line-chart', {
	extends: Bar,
	mounted() {
		this.renderChart(
			{
				labels: ['Variable Costs', 'Rent', 'Revenue'],
				datasets:
				[{
					backgroundColor: '#f87979',
					data
				}]
			},
			{
				responsive: true,
				maintainAspectRatio: false
			}
		)
	}
})

// const Vue = require('vue')
const vm = new Vue({
	el: '#graph-app',
	data: {
		text: 'hej',
		waterSlider: 10
	}
})

vm.$watch('a', (newVal, oldVal) => {
// this callback will be called when `vm.a` changes
	console.log(newVal, ' ', oldVal)
})
/* eslint-enable */

