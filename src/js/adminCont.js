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

	nameInput.setAttribute('type', 'text')
	nameInput.setAttribute('name', 'name')

	typeInput.setAttribute('type', 'text')
	typeInput.setAttribute('name', 'type')

	priceInput.setAttribute('type', 'text')
	priceInput.setAttribute('name', 'price')

	sizeInput.setAttribute('type', 'text')
	sizeInput.setAttribute('name', 'size')

	removeBtn.setAttribute('type', 'submit')
	removeBtn.setAttribute('class', 'remove')
	removeBtn.setAttribute('value', '-')

	div.appendChild(nameInput)
	div.appendChild(typeInput)
	div.appendChild(priceInput)
	div.appendChild(sizeInput)
	div.appendChild(removeBtn)
	// Insert div

	form.insertBefore(div, this)
}
function removeRow() {
	const form = document.querySelector('form')

	// Create div with inputs
	const div = document.createElement('div')
	const nameInput = document.createElement('input')
	const typeInput = document.createElement('input')
	const priceInput = document.createElement('input')
	const sizeInput = document.createElement('input')
	const removeBtn = document.createElement('input')

	nameInput.setAttribute('type', 'text')
	nameInput.setAttribute('name', 'name')

	typeInput.setAttribute('type', 'text')
	typeInput.setAttribute('name', 'type')

	priceInput.setAttribute('type', 'text')
	priceInput.setAttribute('name', 'price')

	sizeInput.setAttribute('type', 'text')
	sizeInput.setAttribute('name', 'size')

	removeBtn.setAttribute('type', 'submit')
	removeBtn.setAttribute('class', 'remove')
	removeBtn.setAttribute('value', '-')

	div.appendChild(nameInput)
	div.appendChild(typeInput)
	div.appendChild(priceInput)
	div.appendChild(sizeInput)
	div.appendChild(removeBtn)
	// Insert div

	form.insertBefore(div, this)
}

const addBtn = document.querySelector('#add')
addBtn.addEventListener('click', addRow)

const foo = document.querySelector('.remove')
foo.addEventListener('click', removeRow)
