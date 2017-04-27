function removeRow(e) {
	e.preventDefault()

	const row = this.parentNode
	const status = row.querySelector('[name="status"]')
	if(status.getAttribute('value') === 'new') {
		row.parentNode.removeChild(row)
	} else {
		row.classList.add('removed')
		status.setAttribute('value', 'removed')
	}
}

function disableSubmit(isDisabled) {
	const submitButton = document.querySelector('[name="submit"]')
	if(isDisabled) {
		submitButton.setAttribute('disabled', isDisabled)
	} else {
		submitButton.removeAttribute('disabled')
	}
}

function isNumber(e) {
	e.preventDefault()
	console.log(e)

	if(isNaN(e.target.value)) {
		this.classList.add('incorrectInput')
		disableSubmit(true)
	} else {
		this.classList.remove('incorrectInput')
		disableSubmit(false)
	}
}

function rowEdited(e) {
	e.preventDefault()

	const row = this.parentNode
	const status = row.querySelector('[name="status"]')

	if(!(status.getAttribute('value') === 'new')) {
		row.classList.add('edited')
		status.setAttribute('value', 'edited')
	}
}

function addRow() {
	// Get form
	const form = document.querySelector('form')

	// Create div with inputs
	const div = document.createElement('div')
	div.innerHTML =
	`
	<input type="text" required class="textbox" name="name"/><input type="text" required class="textbox" name="type"/><input type="text" required class="textbox number" name="price"/><input type="text" required class="textbox number" name="size"/><input type="button" class="remove" value = "-"/><input type="hidden" name="id" value="undefined"/><input type="hidden" name="status" value="new"/>
	`

	const removeBtn = div.querySelector('.remove')
	removeBtn.addEventListener('click', removeRow)

	// Insert div
	form.insertBefore(div, this)
}

const addBtn = document.querySelector('#add')
addBtn.addEventListener('click', addRow)

const removeBtns = document.querySelectorAll('.remove')
removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

const editedRow = document.querySelectorAll('.textbox')
editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))

const checkIfNumber = document.querySelectorAll('.number')
checkIfNumber.forEach(textbox => textbox.addEventListener('change', isNumber))
