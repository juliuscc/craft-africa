const ScrollMagic = require('scrollmagic')

function init() {
	const controller = new ScrollMagic.Controller()
	new ScrollMagic.Scene({
		triggerElement: 'body',
		triggerHook: 'onLeave',
		offset: 10
	})
	.setClassToggle('nav.nav', 'small')
	.addTo(controller)
}

module.exports = { init }
