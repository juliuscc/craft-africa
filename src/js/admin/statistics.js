const Chart = require('chart.js')

const ctx = document.getElementById('myChart')
const ctx2 = document.getElementById('myChart2')
const ctx3 = document.getElementById('myChart3')
const ctx4 = document.getElementById('myChart4')
const ctx5 = document.getElementById('myChart5')
const ctx6 = document.getElementById('myChart6')
const ctx7 = document.getElementById('myChart7')
const ctx8 = document.getElementById('myChart8')
const ctx9 = document.getElementById('myChart9')
const ctx10 = document.getElementById('myChart10')
const ctx11 = document.getElementById('myChart11')
const ctx12 = document.getElementById('myChart12')

const obj = {
	type: 'bar',
	data: {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'asdf', 'fds'],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 2, 3],
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

new Chart(ctx, obj)
new Chart(ctx2, obj)
new Chart(ctx3, obj)
new Chart(ctx4, obj)
new Chart(ctx5, obj)
new Chart(ctx6, obj)
new Chart(ctx7, obj)
new Chart(ctx8, obj)
new Chart(ctx9, obj)
new Chart(ctx10, obj)
new Chart(ctx11, obj)
new Chart(ctx12, obj)
