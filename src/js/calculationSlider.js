/* eslint-disable */
const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const ajax = require('./ajax')
const slider = require('./calculation-form/slider')

const calcObj = { stats: { distribution: { tap: 0, bottle: 0.01, keg: 0 }, distributionLock: ['tap', 'bottle'] }, economics: {} }

ajax.loadJSON('/data/stats')
.then((json) => {
	calcObj.stats = json
	createVueSlider()
})
// .catch((msg) => {
// 	console.log(`Error msg in calculationForm.js: ${msg}`)
// })

let shouldUpdate = true
function updateCalcObj() {
	if(shouldUpdate) {
		shouldUpdate = false

		stats.getCalculationStats(calcObj.stats)
		economics.getEconomics(calcObj.stats, calcObj.economics)

		setTimeout(() => { shouldUpdate = true }, 40)
	}
}

function createVueSlider() {
	const vm = new Vue({
		el: '#calc-slider',
		data: {
			totalVolume: 0,
			profit: 0,
			minValue: 0,
			maxValue: 20000
		},
		watch: {
			totalVolume: function () {
				calcObj.stats.volume.total = this.totalVolume
				updateCalcObj()
				slider.updateAll()
				if(calcObj.economics.profit !== '-') {
					this.profit = Math.round(calcObj.economics.profit)
				} else {
					this.profit = '-'
				}
			},
			deep: true
		},
		mounted: function () {
			// Init slider output
			slider.init()

			// Move init value to the slider
			this.totalVolume = calcObj.stats.volume.total
			this.minValue = calcObj.stats.volume.minValue
			this.maxValue = calcObj.stats.volume.maxValue

			// Set initial value
			updateCalcObj()
			this.profit = Math.round(calcObj.economics.profit)

			// Updating elements that are created by vue
			setTimeout(() => {
				slider.updateAll()
			}, 1)
		}
	})
}

/* eslint-enable */

