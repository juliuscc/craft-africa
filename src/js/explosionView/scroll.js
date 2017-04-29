const ScrollMagic = require('scrollmagic')
const animationHandler = require('./animations')

function init() {
	const controller = new ScrollMagic.Controller()

	const windowHeight = document.querySelector('.explosion-view').offsetHeight
	const halveWindow = windowHeight / 2

	new ScrollMagic.Scene({
		triggerElement: '.explosion-view-container',
		offset: halveWindow
	})
	.on('enter', animationHandler.explode)
	.on('leave', animationHandler.implode)
	.addTo(controller)
}

module.exports = { init }
