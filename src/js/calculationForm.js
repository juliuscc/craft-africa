const stats = require('./calculation-form/stats')
const economics = require('./calculation-form/economics')
const formInteraction = require('./calculation-form/formInteraction')
// const containerCalculator2 = require('./calculation-form/containerCalculator')
const ajax = require('./ajax')

const calcObj = { stats: {}, economics: {} }


// JSON Testing - inegrate this asap /T
for(let i = 0; i < 10; i += 1) {
	ajax.logCalc(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100), Math.floor(Math.random() * 100))
}
