const Chart = require('chart.js')
const ajax = require('../ajax')

const bgColors = [
	'rgba(255, 99, 132, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(255, 206, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(153, 102, 255, 0.2)'
]

const boColors = [
	'rgba(255,99,132,1)',
	'rgba(54, 162, 235, 1)',
	'rgba(255, 206, 86, 1)',
	'rgba(75, 192, 192, 1)',
	'rgba(153, 102, 255, 1)',
	'rgba(153, 102, 255, 1)',
	'rgba(153, 102, 255, 1)'
]

function drawChart(JSON) {
	let chartLabels = []
	let dataVals = []
	for(let i = 0; i < JSON.views.length; i += 1) {
		chartLabels = chartLabels.concat([JSON.views[i].data.path])
		dataVals = dataVals.concat([JSON.views[i].data.count])
	}
	const ctx = document.getElementById('myChart')
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
	new Chart(ctx, obj)
}

function ajaxFun() {
	ajax.loadJSON('/admin/statistics/data')
	.then((JSON) => {
		drawChart(JSON)
		console.log(JSON)
	}).catch((msg) => {
		console.log(msg)
	})
}

ajaxFun()

const ctx2 = document.getElementById('myChart2')
const ctx3 = document.getElementById('myChart3')



const obj = {
	type: 'bar',
	data: {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'asdf', 'fds'],
		datasets: [{
			label: '# of Votes',
			data: [1, 19, 3, 5, 2, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(153, 102, 255, 0.2)'
			],
			borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(153, 102, 255, 1)'
			],
			borderWidth: 1
		}]
	},
	options: {
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
new Chart(ctx2, obj)
new Chart(ctx3, obj)
/* eslint-enable no-new */
