const view = document.querySelector('.explosion-view')

function handleTransition() {
	if(view.classList.contains('exploding')) {
		view.classList.add('exploded')
		view.classList.remove('exploding')
	} else if(view.classList.contains('imploding')) {
		view.classList.remove('walls-of')
		view.classList.remove('imploding')
	}
}

view.addEventListener('transitionend', handleTransition)

function explode() {
	view.classList.add('walls-of')
	view.classList.add('exploding')
}

function implode() {
	view.classList.remove('exploded')
	view.classList.add('imploding')
}

module.exports = { explode, implode }
