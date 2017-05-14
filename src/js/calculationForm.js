/* eslint-disable */
// import Vue from 'vue'
// import { Bar, mixins } from 'vue-chartjs'

const { Bar } = VueChartJs
const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
const ajax = require('./ajax')
const slider = require('./calculation-form/slider')
const informationBox = require('./calculation-form/informationBox')

const calcObj = { stats: { distribution: { tap: 0, bottle: 0.01, keg: 0 }, distributionLock: ['tap', 'bottle'] }, economics: {} }

function updateCalcObj() {
	stats.getCalculationStats(calcObj.stats)
	economics.getEconomics(calcObj.stats, calcObj.economics)
}

ajax.loadJSON('/data/stats')
.then((json) => {
	calcObj.stats = json
	createVueApp()
})
// .catch((msg) => {
// 	console.log(`Error msg in calculationForm.js: ${msg}`)
// })



// Define the chart object
const chart = Vue.component('economics-chart', {
	extends: Bar,
	props: ['chartData'],
	mounted() {
		this.renderChart(
			{
				labels: ['Variable Costs', 'Rent', 'Revenue'],
				datasets:
				[{
					backgroundColor: '#3C5B47',
					hoverBackgroundColor: '#549069',
					borderColor: '#3C5B47',
					hoverBorderColor: '#549069',
					borderSkipped: 'bottom',
					borderWidth: 2,

					data: this.chartData.points
				}]
			},
			{
				responsive: true,
				maintainAspectRatio: false,
				scales: {
						xAxes: [{
							categoryPercentage: 0.8,
							barPercentage: 0.6
						}],
						yAxes: [{
							display: true,
							ticks: {
								beginAtZero: true,
								suggestedMax: 50000,
								scaleStepWidth: 10000,
								// max: 100000
							}
						}]
				},
				legend: {
					display: false
				}
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

function updateGraph(app) {
	// Do calculations
	updateCalcObj()

	// Update graph datapoints
	app.chartData.points[0] = calcObj.economics.variableCosts.total // Variable
	app.chartData.points[1] = calcObj.economics.fixedCosts.total // Rent
	app.chartData.points[2] = calcObj.economics.incomes.total // Revenue

	// Trigger event
	app.chartData.updated++
}

function updateFintuningSliders(app, lastTouched) {
	// Init
	if(!calcObj.stats.distributionLock) {
		calcObj.stats.distributionLock = ['tap', 'bottle']
	}

	// Add current
	if(lastTouched !== calcObj.stats.distributionLock[0]) {
		calcObj.stats.distributionLock[1] = calcObj.stats.distributionLock[0]
	}
	calcObj.stats.distributionLock[0] = lastTouched

	// Set updated values
	const newDistribution = formInteraction.getNewDistribution(calcObj.stats)
	app.sliderTap = newDistribution.tap
	app.sliderBottle = newDistribution.bottle
	app.sliderKeg = newDistribution.keg

	// Add the output label
	slider.updateAll()
}

function createVueApp() {
	const vm = new Vue({
		el: '#calc-app',
		data: {
			totalVolume: 0,
			sliderTap: 0,
			sliderKeg: 0,
			sliderBottle: 0,
			tapPercent: 0,
			kegPercent: 0,
			bottlePercent: 0,
			chartData: {
				points: [0, 0, 0],
				updated: 1
			}
		},
		watch: {
			totalVolume: function () {
				calcObj.stats.volume.total = this.totalVolume
			},
			sliderTap: function() {
				calcObj.stats.distribution.tap = this.sliderTap
				this.tapPercent = Math.round(this.sliderTap * 100)
			},
			sliderKeg: function() {
				calcObj.stats.distribution.keg = this.sliderKeg
				this.kegPercent = Math.round(this.sliderKeg * 100)
			},
			sliderBottle: function() {
				calcObj.stats.distribution.bottle = this.sliderBottle
				this.bottlePercent = Math.round(this.sliderBottle * 100)
			}
		},
		mounted: function () {
			// Add the update graph object
			document.querySelectorAll('.activeSlider')
			.forEach((e) => {
				e.addEventListener('change', () => {
					updateGraph(this)
				})
			})

			document.querySelectorAll('.container-distribution')
			.forEach((e) => {
				e.addEventListener('input', (event) => {
					updateFintuningSliders(this, event.srcElement.name)
				})
			})

			// Init slider output
			slider.init()

			// Add extra information box interactivity
			informationBox.init()

			// Init sliders
			this.totalVolume = calcObj.stats.volume.total

			this.sliderTap = calcObj.stats.distribution.tap
			this.sliderKeg = calcObj.stats.distribution.keg
			this.sliderBottle = calcObj.stats.distribution.bottle

			this.tapPercent = Math.round(this.sliderTap * 100)
			this.kegPercent = Math.round(this.sliderKeg * 100)
			this.bottlePercent = Math.round(this.sliderBottle * 100)
			
			// Make sure the graph shows the correct stuff
			updateGraph(this)

			// Solving bug
			setTimeout(slider.updateAll, 1)
		}
	})
}

/* eslint-enable */

