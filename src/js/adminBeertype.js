function removeRow() {
	const row = this.parentNode.parentNode.parentNode.parentNode
	// e.preventDefault()
	// console.log('this is the row: ', row)


	const status = row.querySelector('[name="status"]')

	row.classList.add('removed')

	if(status.value === 'new') {
		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
	} else {
		const requiredCLasses = [
			row.querySelector('[name="name"]'),
			row.querySelector('[name="fermentingTime"]'),
			row.querySelector('[name="hops"]'),
			row.querySelector('[name="malt"]')
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
<div class="row" class="newRow">
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

	const addBtn2 = document.querySelector('#add')
	addBtn2.addEventListener('click', addRow)

	const removeBtns = document.querySelectorAll('.remove')
	removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

	const enableBtn = document.querySelectorAll('.enable')
	enableBtn.forEach(btn => btn.addEventListener('click', enableRemove))

	const editedRow = document.querySelectorAll('.validate')
	editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))
})
/* eslint-enable no-undef */
