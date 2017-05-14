function close(e) {
	e.preventDefault()
	const advancedTab = document.querySelector('.container-box .advanced-tab')
	advancedTab.dataset.state = 'closed'
}

function open(e) {
	e.preventDefault()
	const advancedTab = document.querySelector('.container-box .advanced-tab')
	advancedTab.dataset.state = 'open'
}

function init() {
	const advancedTab = document.querySelector('.container-box .advanced-tab')
	const hider = advancedTab.querySelector('.toggle .hide')
	const shower = advancedTab.querySelector('.toggle .show')

	hider.addEventListener('click', close)
	shower.addEventListener('click', open)
}

module.exports = { init }
