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

function isHundred(e) {
	e.preventDefault()

	// this.setAttribute('value', 33)

	// this.value = 33

	const currentNumber = Number.parseInt(this.value, 10)

	const allHundred = document.querySelectorAll('.hundred')
	let totalValue = 0
	allHundred.forEach((value) => {
		totalValue += Number.parseInt(value.value, 10)
	})

	let missingValue = totalValue
	missingValue -= currentNumber
	missingValue = 100 - missingValue

	console.log(missingValue)

	if(currentNumber < 0) {
		this.setAttribute('value', 0)
		this.value = 0
	} else if(totalValue > 100) {
		this.value = missingValue
		this.setAttribute('value', missingValue)
	}

	totalValue = 0
	allHundred.forEach((value) => {
		totalValue += Number.parseInt(value.value, 10)
	})
}

function rowEdited(e) {
	// console.log('swag')
	e.preventDefault()

	const row = document.querySelector('.everything')
	// const row = this.parentNode.parentNode.parentNode.parentNode
	const status = row.querySelector('[name="status"]')
	row.classList.add('edited')
	status.setAttribute('value', 'edited')
}
const editedRow = document.querySelectorAll('.validate')
editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))

const hundred = document.querySelectorAll('.hundred')
hundred.forEach(textbox => textbox.addEventListener('change', isHundred))

/* const checkIfNumber = document.querySelectorAll('.number')
checkIfNumber.forEach(textbox => textbox.addEventListener('change', isNumber))*/
