function removeRow() {
	const row = this.parentNode.parentNode.parentNode.parentNode
	const status = row.querySelector('[name="status"]')
	row.classList.add('removed')

	if(status.value === 'new') {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
	} else {
		const requiredCLasses = [
			row.querySelector('[name="name"]'),
			row.querySelector('[name="type"]'),
			row.querySelector('[name="series"]'),
			row.querySelector('[name="price"]')
		]
		requiredCLasses.forEach((el) => {
			el.removeAttribute('required')
		})
		status.setAttribute('value', 'removed')
	}
}

function removeTemp() {
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
}

function enableRemove() {
	const temp = this.getAttribute('data-target')
	const modal = document.querySelector(`#${temp}`)
	modal.querySelector('.remove')
		.querySelector('.waves-button-input').removeAttribute('disabled')
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

	if(isNaN(e.target.value)) {
		this.classList.add('incorrectInput')
		disableSubmit(true)
	} else {
		this.classList.remove('incorrectInput')
		disableSubmit(false)
	}
}

function rowEdited() {
	const row = this.parentNode.parentNode
	const status = row.querySelector('[name="status"]')

	if(!(status.getAttribute('value') === 'new')) {
		row.classList.add('edited')
		status.setAttribute('value', 'edited')
	}
}

function dropdownEdited(event) {
	const row = event.data.parentElement.parentElement.parentElement
	const status = row.querySelector('[name="status"]')

	if(!(status.getAttribute('value') === 'new')) {
		row.classList.add('edited')
		status.setAttribute('value', 'edited')
	}
}

function addRow() {
	// Get form
	const form = document.querySelector('.addRow')
	// Create div with inputs
	const div = document.createElement('div')
	div.classList.add('card-panel')
	div.innerHTML =
`
<div class="row" class="newRow">
	<div class="input-field col s3">
		<input id="name" type="text" name="name" required="" class="validate">
		<label for="name">Name</label>
	</div>
	<div class="input-field col s3">
		<select class="validate" name="type" required>
			<option value="addon">addon</option>
			<option value="fermenting">fermenting</option>
			<option value="production">production</option>
		</select>
		<label>Choose container type</label>
	</div>
	<div class="input-field col s3">
		<select class="validate" name="series" required>
			<option value="a">a</option>
			<option value="b">b</option>
			<option value="c">c</option>
		</select>
		<label>Choose containers series</label>
	</div>
	<div class="input-field col s3">
		<input id="price" type="number" name="price" required="" class="validate">
		<label for="price">Price</label>
	</div>
	<div class="input-field col s3">
		<input id="fermentingCapacity" type="number" name="fermentingCapacity" class="validate">
		<label for="fermentingCapacity">Fermenting Capacity (average per month)</label>
	</div>
	<div class="input-field col s3">
		<input id="storageCapacity" type="number" name="storageCapacity" class="validate">
		<label for="storageCapacity">Storage Capacity</label>
	</div>
	<div class="input-field col s3">
		<input id="brewingCapacity" type="number" name="brewingCapacity" class="validate">
		<label for="brewingCapacity">Brewing Capacity</label>
	</div>
	<div class="input-field col s3">
		<input id="waterProduction" type="number" name="waterProduction" class="validate">
		<label for="waterProduction">Water Production</label>
	</div>
	<div class="input-field col s3">
		<input id="electricityProduction" type="number" name="electricityProduction" class="validate">
		<label for="electricityProduction">Electricity Production</label>
	</div>
	<div class="input-field col s3">
		<input id="comment" type="text" name="comment" class="validate">
		<label for="comment">Comment</label>
	</div>
	<input type="button" value="remove" class="remove btn right red">
	<input type="hidden" name="id" value="undefined">
	<input type="hidden" name="status" value="new">
</div>
`

	const removeBtn = div.querySelector('.remove')
	removeBtn.addEventListener('click', removeTemp)

	// Insert div
	form.prepend(div)

	/* eslint-disable no-undef */
	$('select').material_select()
	/* eslint-enable no-undef */
}

/* eslint-disable no-undef */
$(document).ready(() => {
	$('select').material_select()

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal()

	const addBtn = document.querySelector('#add')
	addBtn.addEventListener('click', addRow)

	const removeBtns = document.querySelectorAll('.remove')
	removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

	const enableBtn = document.querySelectorAll('.enable')
	enableBtn.forEach(btn => btn.addEventListener('click', enableRemove))

	const editedRow = document.querySelectorAll('.validate')
	const editedDropdown = document.querySelectorAll('select.validate')
	editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))
	Materialize.updateTextFields()
	editedDropdown.forEach(textbox => $(textbox).on('change', null, textbox, (event) => {
		dropdownEdited(event)
	}).material_select())

	const checkIfNumber = document.querySelectorAll('.number')
	checkIfNumber.forEach(textbox => textbox.addEventListener('change', isNumber))

	// Submit all forms
	// const submitButtons = document.querySelectorAll('input[type="submit"]')
	// submitButtons.forEach((element) => {
	// 	element.addEventListener('click', (e) => {
	// 		e.preventDefault()
	// 		document.querySelectorAll('form').forEach((form) => {
	// 			form.submit()
	// 		})
	// 	})
	// })
})
/* eslint-enable no-undef */
