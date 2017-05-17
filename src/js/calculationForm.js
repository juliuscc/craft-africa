/* eslint-disable */
// import Vue from 'vue'
// import { Bar } from 'vue-chartjs'

const { Bar } = VueChartJs
const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
const ajax = require('./ajax')
const slider = require('./calculation-form/slider')
const drawer = require('./calculation-form/drawer')

const calcObj = { stats: { distribution: { tap: 0, bottle: 0.01, keg: 0 }, distributionLock: ['tap', 'bottle'] }, economics: {} }

let shouldUpdate = true
let shouldLog = false
let logs = 0

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
								callback: function(label, index, labels) {
								                        return label+'$';
								                    }
								// max: 100000
							},
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

function sendActivity() {
	if(shouldLog) {
		shouldLog = false
		
		ajax.logCalc(calcObj.stats.volume.total, calcObj.stats.distribution.tap*100, calcObj.stats.distribution.keg*100, calcObj.stats.distribution.bottle*100)

		setTimeout(() => {
			if(logs < 8){
				shouldLog = true
			}
		}, 8000)
	}
}

function initInteractiveSliders(app) {
	// Add the update graph object
	const activeSliders = document.querySelectorAll('.activeSlider')
	
	activeSliders.forEach((element) => {
		element.addEventListener('change', () => {
			updateCalcObj()
			updateGraph(app)
			updateEconomicsDataAdvanced(app)
			sendActivity()
		})
	})
	
	activeSliders.forEach((element) => {
		element.addEventListener('input', () => {
			updateCalcObj()
			updateContainers(app)
			updateEconomicsData(app)
		})
	})

	document.querySelectorAll('.distribution-text-input').forEach((element) => {
		element.addEventListener('change', () => {
			console.log('input')
			updateCalcObj()
			updateGraph(app)
			updateEconomicsDataAdvanced(app)
		})
	})

	app.totalVolume = calcObj.stats.volume.total

	app.sliderTap = calcObj.stats.distribution.tap
	app.sliderKeg = calcObj.stats.distribution.keg
	app.sliderBottle = calcObj.stats.distribution.bottle
	app.sliderWater = calcObj.stats.distribution.water

	app.tapPercent = Math.round(app.sliderTap * 100)
	app.kegPercent = Math.round(app.sliderKeg * 100)
	app.bottlePercent = Math.round(app.sliderBottle * 100)

	app.tapPrice = calcObj.stats.sellingPrice.tap
	app.kegPrice = calcObj.stats.sellingPrice.keg
	app.bottlePrice = calcObj.stats.sellingPrice.bottle
	app.waterPrice = calcObj.stats.sellingPrice.water
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

	app.addon.forEach((addonModule) => {
		if(addonModule.recommended) {
			addonModule.recommendationClass = 'active'
		} else {
			addonModule.recommendationClass = 'inactive'
		}
	})

	// Push containers
	app.statusClass = 'valid'
	app.modules = calcObj.stats.containers.current.all
	app.modules.forEach((container) => {
		container.usagePercent = Math.round(container.usage * 100)
		if(container.usage > 1) {
			app.statusClass = 'invalid'
		}
	})
}

function updateEconomicsData(app) {
	let odo = document.querySelector('.profit');
	if(calcObj.economics.profit !== '-') {
		app.economics.profit = Math.round(calcObj.economics.profit)
	} else {
		app.economics.profit = calcObj.economics.profit + ' '
	}
	odo.innerHTML = app.economics.profit
}

function updateEconomicsDataAdvanced(app) {
	if (calcObj.economics.fixedCosts.rent !== '-') {
		app.economics.fixedCosts.rent = Math.round(calcObj.economics.fixedCosts.rent)
		app.economics.fixedCosts.total = Math.round(calcObj.economics.fixedCosts.total)
	} else {
		app.economics.fixedCosts.rent = calcObj.economics.fixedCosts.rent + ' '
		app.economics.fixedCosts.total = calcObj.economics.fixedCosts.total	+ ' '	
	}

	app.economics.variableCosts.bottlePrice = Math.round(calcObj.economics.variableCosts.bottlePrice)
	app.economics.variableCosts.kegPrice = Math.round(calcObj.economics.variableCosts.kegPrice)
	app.economics.variableCosts.tapPrice = Math.round(calcObj.economics.variableCosts.tapPrice)
	app.economics.variableCosts.ingredients = Math.round(calcObj.economics.variableCosts.ingredients)
	app.economics.variableCosts.total = Math.round(calcObj.economics.variableCosts.total)

	app.economics.incomes.bottlePrice = Math.round(calcObj.economics.incomes.bottlePrice)
	app.economics.incomes.kegPrice = Math.round(calcObj.economics.incomes.kegPrice)
	app.economics.incomes.tapPrice = Math.round(calcObj.economics.incomes.tapPrice)
	app.economics.incomes.waterPrice = Math.round(calcObj.economics.incomes.waterPrice)
	app.economics.incomes.total = Math.round(calcObj.economics.incomes.total)
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
		// calcObj.stats.distribution.water = app.sliderWater

		slider.updateAll()

		setTimeout(() => { shouldSlidersUpdate = true }, 15)
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
			sliderWater: 0,

			tapPercent: 0,
			kegPercent: 0,
			bottlePercent: 0,

			tapPrice: 0,
			kegPrice: 0,
			bottlePrice: 0,
			waterPrice: 0,

			economics: {
				profit: 0,
				fixedCosts: {
					rent: 0,
					total: 0
				},
				variableCosts: {
					bottlePrice: 0,
					kegPrice: 0,
					tapPrice: 0,
					ingredients: 0,
					total: 0
				},
				incomes: {
					bottlePrice: 0,
					kegPrice: 0,
					tapPrice: 0,
					total: 0
				}
			},

			statusClass: 'valid',

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
			sliderWater: function() {
				calcObj.stats.distribution.water = this.sliderWater
			},
			tapPrice: function() {
				calcObj.stats.sellingPrice.tap = this.tapPrice
			},
			kegPrice: function() {
				calcObj.stats.sellingPrice.keg = this.kegPrice
			},
			bottlePrice : function() {
				calcObj.stats.sellingPrice.bottle = this.bottlePrice
			},
			bottlePrice : function() {
				calcObj.stats.sellingPrice.water = this.waterPrice
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
			updateEconomicsDataAdvanced(this)

			//Moneyflow
			var odo = document.querySelector('.profit')
			window.od = new Odometer({
				  el: odo,
				  value: 0,
				  duration: 200
				  // Any option (other than auto and selector) can be passed in here
				  // format: (,ddd),
				})
			updateEconomicsData(this)
			
			// Updating elements that are created by vue
			setTimeout(() => {
				this.sliderWater = calcObj.stats.distribution.water
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

			// Wait a few seconds before logging
			setTimeout(() => {
				shouldLog = true
			}, 5000)
		}
	})
}

/* eslint-enable */

