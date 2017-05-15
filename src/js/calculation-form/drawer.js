function initDrawer(drawer) {
	console.log(drawer)
}

function init() {
	const drawers = document.querySelectorAll('.drawer')
	drawers.forEach(initDrawer)
}

module.exports = { init }
