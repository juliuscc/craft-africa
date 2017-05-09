// const moduleValidator = require('../../models/moduleValidator')

/* eslint-disable no-undef */
$(document).ready(() => {
	$('select').material_select()
})
$(document).ready(() => {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	$('.modal').modal()
})
/* eslint-enable no-undef */

function babo(e) {
	console.log('babo')
}

const addBtn2 = document.querySelector('#add')
addBtn2.addEventListener('click', babo)

// const editedRow = document.querySelectorAll('.validate')
// editedRow.forEach(textbox => textbox.addEventListener('change', rowEdited))

// const hundred = document.querySelectorAll('.hundred')
// hundred.forEach(textbox => textbox.addEventListener('change', isHundred))
