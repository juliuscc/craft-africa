/* eslint-disable */
// import Vue from 'vue'
// import { Bar, mixins } from 'vue-chartjs'

const { Bar } = VueChartJs
const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
const ajax = require('./ajax')
const slider = require('./calculation-form/slider')
const drawer = require('./calculation-form/drawer')

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

function initInteractiveSliders(app) {
	// Add the update graph object
	const activeSliders = document.querySelectorAll('.activeSlider')
	
	activeSliders.forEach((element) => {
		element.addEventListener('change', () => {
			updateCalcObj()
			updateGraph(app)
		})
	})
	
	activeSliders.forEach((element) => {
		element.addEventListener('input', () => {
			updateCalcObj()
			updateContainers(app)
			updateEconomicsData(app)
		})
	})

	app.totalVolume = calcObj.stats.volume.total

	app.sliderTap = calcObj.stats.distribution.tap
	app.sliderKeg = calcObj.stats.distribution.keg
	app.sliderBottle = calcObj.stats.distribution.bottle

	app.tapPercent = Math.round(app.sliderTap * 100)
	app.kegPercent = Math.round(app.sliderKeg * 100)
	app.bottlePercent = Math.round(app.sliderBottle * 100)
}

function updateCalcObj() {
	if(shouldUpdate) {
		shouldUpdate = false

		stats.getCalculationStats(calcObj.stats)
		economics.getEconomics(calcObj.stats, calcObj.economics)

		setTimeout(() => { shouldUpdate = true }, 40)
	}
}

function updateGraph(app) {
	// Update graph datapoints
	app.chartData.points[0] = calcObj.economics.variableCosts.total // Variable
	app.chartData.points[1] = calcObj.economics.fixedCosts.total // Rent
	app.chartData.points[2] = calcObj.economics.incomes.total // Revenue

	// Trigger event
	app.chartData.updated++
}

function updateContainers(app) {
	// Add addons modules
	if(app.addon.length === 0) {
		app.addon = calcObj.stats.containers.addon
		app.addon.forEach((addonModule) => {
			addonModule.choosen = false
		})
	}

	// Push containers
	app.modules = calcObj.stats.containers.current.all
	app.modules.forEach((element) => {
		element.usagePercent = Math.round(element.usage * 100)
	})
}

function updateEconomicsData(app) {
	app.profit = Math.round(calcObj.economics.profit)
}

let shouldSlidersUpdate = true
function updateSliders(firstSliderName, secondSliderName, app) {
	if(shouldSlidersUpdate) {
		shouldSlidersUpdate = false

		app.sliderTap = parseFloat(app.sliderTap)
		app.sliderKeg = parseFloat(app.sliderKeg)
		app.sliderBottle = parseFloat(app.sliderBottle)

		const diff = (1.0 - app.sliderTap - app.sliderKeg - app.sliderBottle) / 2

		if(diff !== 0 && diff) {
			app[firstSliderName] += diff
			app[secondSliderName] += diff
			if(app[firstSliderName] < 0 && app[firstSliderName] !== NaN) {
				app[secondSliderName] += app[firstSliderName]
				app[firstSliderName] = 0
			} else if (app[secondSliderName] < 0 && app[secondSliderName] !== NaN) {
				app[firstSliderName] += app[secondSliderName] 
				app[secondSliderName] = 0
			}
		}

		app.tapPercent = Math.round(app.sliderTap * 100)
		app.kegPercent = Math.round(app.sliderKeg * 100)
		app.bottlePercent = Math.round(app.sliderBottle * 100)

		calcObj.stats.distribution.tap = app.sliderTap
		calcObj.stats.distribution.keg = app.sliderKeg
		calcObj.stats.distribution.bottle = app.sliderBottle

		slider.updateAll()

		setTimeout(() => { shouldSlidersUpdate = true }, 20)
	}
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
			addon: [],

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
				updateSliders('sliderKeg', 'sliderBottle', this)
			},
			sliderKeg: function() {
				updateSliders('sliderTap', 'sliderBottle', this)
			},
			sliderBottle: function() {
				updateSliders('sliderKeg', 'sliderTap', this)
			},
			deep: true
		},
		mounted: function () {
			// Init slider output
			slider.init()
			// Init the interactivity with sliders
			initInteractiveSliders(this)

			// Add extra information box interactivity
			drawer.init()

			// Make sure the graph shows the correct stuff
			updateCalcObj()
			updateGraph(this)
			updateContainers(this)
			updateEconomicsData(this)

			// Updating elements that are created by vue
			setTimeout(() => {
				slider.updateAll()

				document.querySelectorAll('.activeCheckbox').forEach((element) => {
					element.addEventListener('click', () => {
						updateCalcObj()
						updateGraph(this)
						updateContainers(this)
						updateEconomicsData(this)
					})
				})
			}, 1)
		}
	})
}

/* eslint-enable */

