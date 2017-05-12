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

function updateCalcObj() {
	stats.getCalculationStats(calcObj.stats)
	economics.getEconomics(calcObj.stats, calcObj.economics)
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

const chart = Vue.component('line-chart', {
	extends: Bar,
	// mixins: [reactiveProp],
	props: ['chartData'],
	mounted() {
		this.renderChart(
			{
				output: 1,
				labels: ['Variable Costs', 'Rent', 'Revenue'],
				datasets:
				[{
					backgroundColor: '#f87979',
					data: this.chartData.points
				}]
			},
			{
				responsive: true,
				maintainAspectRatio: false
			}
		)
	},
	watch: {
		// Watching for updates
		'chartData.updated': function () {
			this._chart.update()
		},
		deep: true
	}
})

// const Vue = require('vue')
const vm = new Vue({
	el: '#graph-app',
	data: {
		text: 'hej',
		totalVolume: 0,
		sliderTap: 0,
		sliderKeg: 0,
		sliderBottle: 0,
		chartData: {
			points: [40, 39, 10],
			updated: 1
		}
	},
	watch: {
		totalVolume: function () {
			calcObj.stats.volume.total = this.totalVolume
		},
		sliderTap: function() {
			calcObj.distribution.tap = this.sliderTap
		},
		sliderKeg: function() {

		},
		sliderBottle: function() {

		}
	},
	mounted: function () {
		console.log('this: ', this)
		document.querySelector('#totalVolume')
			.addEventListener('change', () => {
				// Update the calculation stats
				calcObj.stats.volume.total = this.totalVolume

				updateCalcObj()
				console.log(calcObj.stats.volume.total)

				// Variable
				this.chartData.points[0] = calcObj.economics.variableCosts.total
				// Rent
				this.chartData.points[1] = calcObj.economics.fixedCosts.total
				// Revenue
				this.chartData.points[2] = calcObj.economics.incomes.total
				// Trigger a graph update
				this.chartData.updated++
			})
	}
})
/* eslint-enable */

