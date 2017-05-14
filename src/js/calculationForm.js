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

let shouldUpdate = true

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

function updateCalcObj() {
	if(shouldUpdate) {
		shouldUpdate = false

		stats.getCalculationStats(calcObj.stats)
		economics.getEconomics(calcObj.stats, calcObj.economics)

		setTimeout(() => { shouldUpdate = true }, 40)
	}
}

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

function updateContainers(app) {
	// Push containers
	app.modules = calcObj.stats.containers.current.all
	app.modules.forEach((element) => {
		element.usagePercent = Math.round(element.usage * 100)
	})
}

function getDistributionDiff(app) {
	const res = (1.0 - app.sliderTap - app.sliderKeg - app.sliderBottle) / 2
	return res
}

function updateInteractiveValues(firstSliderName, secondSliderName, app) {
	const diff = (1.0 - app.sliderTap - app.sliderKeg - app.sliderBottle) / 2

	if(diff !== 0 && diff) {
		console.log(diff)
		app[firstSliderName] += diff
		app[secondSliderName] += diff

		let temp = 0
		if(app[firstSliderName] < 0 && app[firstSliderName] !== NaN) {
			app[secondSliderName] += app[firstSliderName]
			app[firstSliderName] = 0
		} else if (app[secondSliderName] < 0 && app[secondSliderName] !== NaN) {
			app[firstSliderName] += app[secondSliderName] 
			app[secondSliderName] = 0
		}
	}
}

function updateStaticValues(app) {
	app.tapPercent = Math.round(app.sliderTap * 100)
	app.kegPercent = Math.round(app.sliderKeg * 100)
	app.bottlePercent = Math.round(app.sliderBottle * 100)

	calcObj.stats.distribution.tap = app.sliderTap
	calcObj.stats.distribution.keg = app.sliderKeg
	calcObj.stats.distribution.bottle = app.sliderBottle

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

			profit: 0,

			modules: [],

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
				if(shouldUpdate) {
					shouldUpdate = false

					if (typeof this.sliderTap === 'string' || this.sliderTap instanceof String) {
						this.sliderTap = parseFloat(this.sliderTap)
					}
					updateInteractiveValues('sliderKeg', 'sliderBottle', this)
					updateStaticValues(this)

					setTimeout(() => { shouldUpdate = true }, 20)
				}
			},
			sliderKeg: function() {
				if(shouldUpdate) {
					shouldUpdate = false
					
					if (typeof this.sliderKeg === 'string' || this.sliderKeg instanceof String) {
						this.sliderKeg = parseFloat(this.sliderKeg)
					}
					updateInteractiveValues('sliderTap', 'sliderBottle', this)
					updateStaticValues(this)

					setTimeout(() => { shouldUpdate = true }, 20)
				}
			},
			sliderBottle: function() {
				if(shouldUpdate) {
					shouldUpdate = false
	
					if (typeof this.sliderBottle === 'string' || this.sliderBottle instanceof String) {
						this.sliderBottle = parseFloat(this.sliderBottle)
					}
					updateInteractiveValues('sliderKeg', 'sliderTap', this)
					updateStaticValues(this)

					setTimeout(() => { shouldUpdate = true }, 20)
				}
			}
		},
		mounted: function () {
			// Add the update graph object
			const activeSliders = document.querySelectorAll('.activeSlider')
			
			activeSliders.forEach((element) => {
				element.addEventListener('change', () => {
					updateGraph(this)
				})
			})
			
			activeSliders.forEach((element) => {
				element.addEventListener('input', () => {
					updateCalcObj()
					updateContainers(this)
					this.profit = Math.round(calcObj.economics.profit)
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

			updateContainers(this)
			this.profit = Math.round(calcObj.economics.profit)

			// Solving bug
			setTimeout(slider.updateAll, 1)
		}
	})
}

/* eslint-enable */

