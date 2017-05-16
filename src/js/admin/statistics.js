const Chart = require('chart.js')
const ajax = require('../ajax')

const bgColors = 'rgba(54, 162, 235, 0.2)'
const boColors = 'rgba(54, 162, 235, 1)'

const calcInputDates = { liters: new Date(), tap: new Date(), keg: new Date(), bottle: new Date() }

let calcInputCharts = {}
let viewsChart = undefined

let firstAjax = true

function drawViewsChart(JSON) {
	let chartLabels = []
	let dataVals = []
	for(let i = 0; i < JSON.views.length; i += 1) {
		chartLabels = chartLabels.concat([JSON.views[i].data.path])
		dataVals = dataVals.concat([JSON.views[i].data.count])
	}
	const ctx = document.getElementById('viewsChart')

	const obj = {
		type: 'bar',
		data: {
			labels: chartLabels,
			datasets: [{
				label: 'Views',
				data: dataVals,
				backgroundColor: bgColors,
				borderColor: boColors,
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: false
		}
	}
	return (new Chart(ctx, obj))
}

function drawCalcInputChartsGetObject(chartLabels, dataValues) {
	return {
		type: 'bar',
		data: {
			labels: chartLabels,
			datasets: [{
				data: dataValues,
				backgroundColor: bgColors,
				borderColor: boColors,
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			responsive: false
		}
	}
}

function drawCalcInputChartsDataFormatting(list) {
	const returnList = Array(101).fill(0)
	for(let i = 0; i < list.length; i += 1) {
		const value = list[i].data.value
		const count = list[i].data.count
		returnList[value] = count
	}
	return returnList
}

function drawCalcInputCharts(JSON) {
	const ctx1 = document.getElementById('litersChart')
	const ctx2 = document.getElementById('tapChart')
	const ctx3 = document.getElementById('bottleChart')
	const ctx4 = document.getElementById('kegChart')
	const percentageLabels = Array.from(Array(100), (x, i) => {
		if(i % 5 === 0) {
			return i
		}
		return ''
	})
	const litersVal = drawCalcInputChartsDataFormatting(JSON.calcInput.liters)
	const tapVal = drawCalcInputChartsDataFormatting(JSON.calcInput.tap)
	const bottleVal = drawCalcInputChartsDataFormatting(JSON.calcInput.bottle)
	const kegVal = drawCalcInputChartsDataFormatting(JSON.calcInput.keg)

	const obj1 = drawCalcInputChartsGetObject(percentageLabels, litersVal)
	const obj2 = drawCalcInputChartsGetObject(percentageLabels, tapVal)
	const obj3 = drawCalcInputChartsGetObject(percentageLabels, bottleVal)
	const obj4 = drawCalcInputChartsGetObject(percentageLabels, kegVal)


	return { liters: new Chart(ctx1, obj1),
		tap: new Chart(ctx2, obj2),
		bottle: new Chart(ctx3, obj3),
		keg: new Chart(ctx4, obj4) }
}

function drawCharts(JSON) {
	viewsChart = drawViewsChart(JSON)
	calcInputCharts = drawCalcInputCharts(JSON)
}

function ajaxFun(dateL, dateT, dateB, dateK, chart, type) {
	ajax.loadJSON('/admin/statistics/data', { dateL: dateL.toDateString(), dateT: dateT.toDateString(), dateB: dateB.toDateString(), dateK: dateK.toDateString() })
	.then((JSON) => {
		if(firstAjax) {
			drawCharts(JSON)
			firstAjax = false
		} else {
			const Val = drawCalcInputChartsDataFormatting(JSON.calcInput[type])
			chart.data.datasets[0].data = Val
			chart.update()
		}
	})
}


function update(type, offset) {
	calcInputDates[type].setMonth(calcInputDates[type].getMonth() + offset)
	document.getElementById(type + 'Date').innerHTML = calcInputDates[type].getFullYear() + ' ' + (calcInputDates[type].getMonth() + 1)
	ajaxFun(calcInputDates.liters, calcInputDates.tap,
	calcInputDates.keg, calcInputDates.bottle, calcInputCharts[type], type)
}

['liters', 'tap', 'keg', 'bottle'].forEach((type) => {
	document.querySelector('#' + type + 'Prev').addEventListener('click', () => { update(type, -1) })
	document.querySelector('#' + type + 'Next').addEventListener('click', () => { update(type, 1) })
})


ajaxFun(calcInputDates.liters, calcInputDates.tap,
	calcInputDates.bottle, calcInputDates.keg)
