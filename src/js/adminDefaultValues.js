/* function disableSubmit(isDisabled) {
	const submitButton = document.querySelector('[name="submit"]')
	if(isDisabled) {
		submitButton.setAttribute('disabled', isDisabled)
	} else {
		submitButton.removeAttribute('disabled')
	}
}*/

/* function isNumber(e) {
	e.preventDefault()

	if(isNaN(e.target.value)) {
		this.classList.add('incorrectInput')
		// disableSubmit(true)
	} else {
		this.classList.remove('incorrectInput')
		// disableSubmit(false)
	}
}*/

const moduleValidator = require('../../models/moduleValidator')
/* eslint-disable no-undef */
$(document).ready(() => {
	$('.tooltipped').tooltip({ delay: 50 })
})
/* eslint-enable no-undef */
function isHundred(e) {
	e.preventDefault()

	const currentNumber = Number.parseInt(this.value, 10)

	const allHundred = document.querySelectorAll('.hundred')

	let totalValue = 0.0
	allHundred.forEach((value) => {
		if(!moduleValidator.isEmpty({ temp: value.value }) &&
			moduleValidator.isNumbers({ temp: value.value })) {
			// console.log('wat?', value.value)
			totalValue += Number.parseFloat(value.value, 10)
		}
	})
	let missingValue = totalValue
	missingValue -= currentNumber
	missingValue = 100 - missingValue

	if(currentNumber < 0) {
		this.setAttribute('value', 0)
		this.value = 0
	} else if(totalValue > 100) {
		this.value = missingValue
		this.setAttribute('value', missingValue)
	} else if(currentNumber > 100) {
		this.setAttribute('value', 0)
		this.value = 0
	}

	totalValue = 0
	allHundred.forEach((value) => {
		totalValue += Number.parseFloat(value.value, 10)
	})
}

function rowEdited(e) {
	e.preventDefault()

	const row = document.querySelector('.everything')
	const status = row.querySelector('[name="status"]')
	row.classList.add('edited')
	status.setAttribute('value', 'edited')
}
const editedRow = document.querySelectorAll('.validate')
editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))

const hundred = document.querySelectorAll('.hundred')
hundred.forEach(textbox => textbox.addEventListener('change', isHundred))
