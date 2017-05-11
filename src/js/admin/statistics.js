const Chart = require('chart.js')
const ajax = require('../ajax')

const bgColors = 'rgba(54, 162, 235, 0.2)'
const boColors = 'rgba(54, 162, 235, 1)'

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
	/* eslint-disable no-new */
	new Chart(ctx, obj)
	/* eslint-enable no-new */
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

	/* eslint-disable no-new */
	new Chart(ctx1, obj1)
	new Chart(ctx2, obj2)
	new Chart(ctx3, obj3)
	new Chart(ctx4, obj4)
	/* eslint-enable no-new */
}

function drawCharts(JSON) {
	drawViewsChart(JSON)
	drawCalcInputCharts(JSON)
}

function ajaxFun() {
	ajax.loadJSON('/admin/statistics/data')
	.then((JSON) => {
		drawCharts(JSON)
		console.log(JSON)
	}).catch((msg) => {
		console.log(msg)
	})
}

ajaxFun()
