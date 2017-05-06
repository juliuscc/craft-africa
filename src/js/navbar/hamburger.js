function toggleNav() {
	const navBar = this.parentElement
	if(navBar.classList.contains('open')) {
		navBar.classList.remove('open')
	} else {
		navBar.classList.add('open')
	}
}

function init() {
	const hamburger = document.querySelector('nav.nav .btn')
	hamburger.addEventListener('click', toggleNav)
}

module.exports = { init }
