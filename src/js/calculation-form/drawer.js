function openDrawer(e, drawer) {
	if(e) {
		e.preventDefault()
		e.stopPropagation()
	}

	const content = drawer.querySelector('.drawer-content')
	const children = [...content.children]

	const innerHeight = children
	.map((child) => {
		const styles = window.getComputedStyle(child) || child.currentStyle
		const heights = [
			parseFloat(styles.marginTop),
			parseFloat(styles.marginBottom),
			parseFloat(styles.paddingTop),
			parseFloat(styles.paddingBottom),
			child.clientHeight
		]
		return heights.reduce((ack, height) => ack + height, 0)
	})
	.reduce((ack, height) => ack + height, 0)

	content.style.height = `${innerHeight}px`
	drawer.dataset.state = 'open'
}

function closeDrawer(e, drawer) {
	e.preventDefault()
	e.stopPropagation()

	const content = drawer.querySelector('.drawer-content')
	content.style.height = '0px'
	drawer.dataset.state = 'closed'
}

function updateDrawer(drawer) {
	if(drawer.dataset.state === 'open') {
		openDrawer(null, drawer)
	}
}

function initDrawer(drawer) {
	const show = drawer.querySelector('.show')
	const hide = drawer.querySelector('.hide')

	show.addEventListener('click', e => openDrawer(e, drawer))
	hide.addEventListener('click', e => closeDrawer(e, drawer))
}

function init() {
	const drawers = document.querySelectorAll('.drawer')
	drawers.forEach(initDrawer)
}

module.exports = {
	init,
	updateDrawer
}
