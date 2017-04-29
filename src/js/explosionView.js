const ScrollMagic = require('scrollmagic')
// const velocity = require('velocity-animate')

const controller = new ScrollMagic.Controller()

const windowHeight = document.querySelector('.explosion-view').offsetHeight
const halveWindow = windowHeight / 2

const sceneHeight = document.querySelector('.explosion-view-container').offsetHeight - windowHeight

new ScrollMagic.Scene({
	triggerElement: '.explosion-view-container',
	offset: halveWindow,
	duration: sceneHeight,
	pushFollowers: false
})
.setPin('.explosion-view')
.addTo(controller)

// console.log(ScrollMagic, velocity)
