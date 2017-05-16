const Chart = require('chart.js')
const ajax = require('../ajax')

const bgColors = 'rgba(54, 162, 235, 0.2)'
const boColors = 'rgba(54, 162, 235, 1)'

const calcInputDates = { liters: new Date(), tap: new Date(), keg: new Date(), bottle: new Date() }

let calcInputCharts = {}

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
		returnList[value] += count
	}
	return returnList
}

function getMax(list) {
	if(list.length === 0) {
		return undefined
	}
	let max = list[0].data.value
	for(let i = 0; i < list.length; i += 1) {
		max = Math.max(max, list[i].data.value)
	}
	return max
}

function drawCalcInputChartsDataFormattingLiters(list) {
	const max = getMax(list)

	const returnList = Array(100).fill(0)
	if(max === undefined) {
		return returnList
	}

	const dj = max / 100

	for(let i = 0; i < list.length; i += 1) {
		for(let j = 0; j < returnList.length; j += 1) {
			if(list[i].data.value < dj * j) {
				returnList[j] += list[i].data.count
				break
			}
		}
	}
	returnList[returnList.length - 1] = list[list.length - 1].data.count
	return returnList
}

function getLabels(Max) {
	return Array.from(Array(100), (x, i) => {
		if(i % 5 === 0) {
			return Math.round((Max / 100) * i)
		}
		return ''
	})
}

function drawCalcInputCharts(JSON) {
	const ctx1 = document.getElementById('litersChart')
	const ctx2 = document.getElementById('tapChart')
	const ctx3 = document.getElementById('bottleChart')
	const ctx4 = document.getElementById('kegChart')
	const percentageLabels = Array.from(Array(101), (x, i) => {
		if(i % 5 === 0) {
			return i
		}
		return ''
	})
	const litersVal = drawCalcInputChartsDataFormattingLiters(JSON.calcInput.liters)
	const tapVal = drawCalcInputChartsDataFormatting(JSON.calcInput.tap)
	const bottleVal = drawCalcInputChartsDataFormatting(JSON.calcInput.bottle)
	const kegVal = drawCalcInputChartsDataFormatting(JSON.calcInput.keg)

	const litersMax = getMax(JSON.calcInput.liters)
	const litersLabels = getLabels(litersMax)

	const obj1 = drawCalcInputChartsGetObject(litersLabels, litersVal)
	const obj2 = drawCalcInputChartsGetObject(percentageLabels, tapVal)
	const obj3 = drawCalcInputChartsGetObject(percentageLabels, bottleVal)
	const obj4 = drawCalcInputChartsGetObject(percentageLabels, kegVal)


	return { liters: new Chart(ctx1, obj1),
		tap: new Chart(ctx2, obj2),
		bottle: new Chart(ctx3, obj3),
		keg: new Chart(ctx4, obj4) }
}

function drawCharts(JSON) {
	drawViewsChart(JSON)
	calcInputCharts = drawCalcInputCharts(JSON)
}

function ajaxFun(dateL, dateT, dateB, dateK, chart, type) {
	ajax.loadJSON('/admin/statistics/data', { dateL: dateL.toDateString(), dateT: dateT.toDateString(), dateB: dateB.toDateString(), dateK: dateK.toDateString() })
	.then((JSON) => {
		if(firstAjax) {
			drawCharts(JSON)
			firstAjax = false
		} else {
			let Val
			if(type.localeCompare('liters') === 0) {
				Val = drawCalcInputChartsDataFormattingLiters(JSON.calcInput[type])
				const litersMax = getMax(JSON.calcInput.liters)
				const litersLabels = getLabels(litersMax)
				chart.data.labels = litersLabels
			} else {
				Val = drawCalcInputChartsDataFormatting(JSON.calcInput[type])
			}

			chart.data.datasets[0].data = Val
			chart.update()
		}
	})
}


function update(type, offset) {
	calcInputDates[type].setMonth(calcInputDates[type].getMonth() + offset)
	document.getElementById(`${type}Date`).innerHTML = `${calcInputDates[type].getFullYear()} ${(calcInputDates[type].getMonth() + 1)}`
	ajaxFun(calcInputDates.liters, calcInputDates.tap,
	calcInputDates.keg, calcInputDates.bottle, calcInputCharts[type], type)
}

['liters', 'tap', 'keg', 'bottle'].forEach((type) => {
	document.querySelector(`#${type}Prev`).addEventListener('click', () => { update(type, -1) })
	document.querySelector(`#${type}Next`).addEventListener('click', () => { update(type, 1) })
})


ajaxFun(calcInputDates.liters, calcInputDates.tap,
	calcInputDates.bottle, calcInputDates.keg)
