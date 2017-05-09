
/* eslint-disable no-undef */
$(document).ready(() => {
	$('select').material_select()
})
$(document).ready(() => {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal()
})
/* eslint-enable no-undef */
function removeRow() {
	const row = this.parentNode.parentNode
	const status = row.querySelector('[name="status"]')

	row.classList.add('removed')

	if(status.value === 'new') {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
	} else {
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

	const row = this.parentNode.parentNode
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
<div class="row">
	<div class="input-field col s3">
		<input id="name" type="text" name="name" required="" class="validate">
		<label for="name">Name</label>
	</div>
	<div class="input-field col s3">
		<select name="type" required>
			<option value="" disabled selected>Choose container type</option>
			<option value="Addon">Addon</option>
			<option value="Fermenting">Fermenting</option>
			<option value="Production">Production</option>
		</select>
		<label>Choose container type</label>
	</div>
	<div class="input-field col s3">
		<input id="series" type="number" name="series" required="" class="validate">
		<label for="series">Series</label>
	</div>
	<div class="input-field col s3">
		<input id="price" type="number" name="price" required="" class="validate">
		<label for="price">Price</label>
	</div>
	<div class="input-field col s3">
		<input id="fermentingCapacity" type="number" name="fermentingCapacity" class="validate">
		<label for="fermentingCapacity">Fermenting Capacity</label>
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
	<input type="button" value="remove" class="remove btn">
	<input type="hidden" name="id" value="undefined">
	<input type="hidden" name="status" value="new">
</div>
`

	const removeBtn = div.querySelector('.remove')
	removeBtn.addEventListener('click', removeRow)

	// Insert div
	form.insertBefore(div, this)

	/* eslint-disable no-undef */
	$('select').material_select()
	/* eslint-enable no-undef */
}

const addBtn = document.querySelector('#add')
addBtn.addEventListener('click', addRow)

const removeBtns = document.querySelectorAll('.remove')
removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

const editedRow = document.querySelectorAll('.validate')
editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))

const checkIfNumber = document.querySelectorAll('.number')
checkIfNumber.forEach(textbox => textbox.addEventListener('change', isNumber))
