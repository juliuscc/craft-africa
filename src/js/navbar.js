function toggleNav() {
	if(this.classList.contains('open')) {
		this.classList.remove('open')
	} else {
		this.classList.add('open')
		this.parentElement.classList.remove('large')
	}
}

const navContainer = document.querySelector('nav.nav .nav-container')
navContainer.addEventListener('click', toggleNav)
