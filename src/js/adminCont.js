function removeRow(e) {
	e.preventDefault()

	// console.log(this)

	const row = this.parentNode
	const status = row.querySelector('[name="status"]')
	if(status.getAttribute('value') === 'new') {
		row.parentNode.removeChild(row)
	} else {
		row.classList.add('removed')
		status.setAttribute('value', 'removed')
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
	const nameInput = document.createElement('input')
	const typeInput = document.createElement('input')
	const priceInput = document.createElement('input')
	const sizeInput = document.createElement('input')
	const removeBtn = document.createElement('input')
	const idInput = document.createElement('input')
	const statusInput = document.createElement('input')

	nameInput.setAttribute('type', 'text')
	nameInput.setAttribute('name', 'name')

	typeInput.setAttribute('type', 'text')
	typeInput.setAttribute('name', 'type')

	priceInput.setAttribute('type', 'text')
	priceInput.setAttribute('name', 'price')

	sizeInput.setAttribute('type', 'text')
	sizeInput.setAttribute('name', 'size')

	removeBtn.setAttribute('type', 'button')
	removeBtn.setAttribute('class', 'remove')
	removeBtn.setAttribute('value', '-')
	removeBtn.addEventListener('click', removeRow)

	idInput.setAttribute('type', 'hidden')
	idInput.setAttribute('name', 'id')
	idInput.setAttribute('value', undefined)

	statusInput.setAttribute('type', 'hidden')
	statusInput.setAttribute('name', 'status')
	statusInput.setAttribute('value', 'new')

	div.appendChild(nameInput)
	div.appendChild(typeInput)
	div.appendChild(priceInput)
	div.appendChild(sizeInput)
	div.appendChild(removeBtn)
	div.appendChild(idInput)
	div.appendChild(statusInput)

	// Insert div
	form.insertBefore(div, this)
}

const addBtn = document.querySelector('#add')
addBtn.addEventListener('click', addRow)

const removeBtns = document.querySelectorAll('.remove')
removeBtns.forEach(btn => btn.addEventListener('click', removeRow))

const editedRow = document.querySelectorAll('.textbox')
editedRow.forEach(btn => btn.addEventListener('change', rowEdited))
