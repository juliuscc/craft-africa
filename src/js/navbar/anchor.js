const velocity = require('velocity-animate')

function scroll(e) {
	e.preventDefault()
	e.stopPropagation()

	const target = document.querySelector(this.getAttribute('href'))
	console.log(target)
	velocity(target, 'scroll', {
		duration: 500,
		offset: -50,
		easing: 'ease-in-out'
	})
}

function init() {
	const anchor = document.querySelector('header.header .down-btn')
	anchor.addEventListener('click', scroll)
}

module.exports = { init }
