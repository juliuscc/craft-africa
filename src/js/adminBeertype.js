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

function rowEdited(e) {
	e.preventDefault()

	const row = this.parentNode.parentNode
	const status = row.querySelector('[name="status"]')

	if(!(status.getAttribute('value') === 'new')) {
		row.classList.add('edited')
		status.setAttribute('value', 'edited')
	}
}

function addBeer() {
	// Get form
	const form = document.querySelector('.addRow')
	// Create div with inputs
	const div = document.createElement('div')
	div.classList.add('card-panel')
	div.innerHTML =
`
<div class="row">
	<div class="input-field col s3">
		<input type="text" name="name" required="" class="validate">
		<label for="name">Name</label>
	</div>
	<div class="input-field col s3">
		<input type="number" name="fermentingTime" step="any" required="" class="validate">
		<label for="fermentingTime">Fermenting time</label>
	</div>
	<div class="input-field col s3">
		<input type="number" name="hops" step="any" required="" class="validate">
		<label for="hopsUse">Hops (kg/l)</label>
	</div>
	<div class="input-field col s3">
		<input type="number" name="malt" step="any" required="" class="validate">
		<label for="maltUse">Malt (kg/l)</label>
	</div>
	<div class="input-field col s3">
		<input type="number" name="co2" step="any" required="" class="validate">
		<label for="co2Use">co2 (kg/l)</label>
	</div>
	<input type="button" value="remove" class="remove btn red right">
	<input type="hidden" name="id" value="undefined">
	<input type="hidden" name="status" value="new">
</div>
`


	const removeBtn = div.querySelector('.remove')
	removeBtn.addEventListener('click', removeRow)

	// Insert div
	form.insertBefore(div, this)
}

/* eslint-disable no-undef */
$(document).ready(() => {
	$('select').material_select()
})
$(document).ready(() => {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal()
})
/* eslint-enable no-undef */

const addBtn2 = document.querySelector('#addBeer')
addBtn2.addEventListener('click', addBeer)

const removeBtns = document.querySelectorAll('.remove')
removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

const editedRow = document.querySelectorAll('.validate')
editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))
