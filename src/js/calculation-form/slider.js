function calcPosition(slider) {
	// Get all prerequisites
	const val = slider.value
	const min = slider.attributes.min.value
	const max = slider.attributes.max.value
	const width = slider.offsetWidth
	const thumbwidth = parseInt(slider.dataset.thumbwidth, 10)

	// Calculate position
	const ratio = ((val - min) / (max - min))
	const position = (ratio * (width - thumbwidth)) + (thumbwidth / 2)

	return position
}

function updateOutput() {
	const position = calcPosition(this)
	const output = this.nextSibling

	output.style.left = `${position}px`
}

function updateAll() {
	const sliders = document.querySelectorAll('input[type="range"].slider')
	setTimeout(() => sliders.forEach(slider => updateOutput.call(slider)), 1)
}

function init() {
	const sliders = document.querySelectorAll('input[type="range"].slider')
	sliders.forEach(slider => slider.addEventListener('change', updateOutput))
	sliders.forEach(slider => slider.addEventListener('input', updateOutput))
	sliders.forEach(slider => updateOutput.call(slider))
}

module.exports = { init, updateAll }
