function toggleNav() {
	if(this.classList.contains('open')) {
		this.classList.remove('open')
	} else {
		this.classList.add('open')
	}
}

const navBtn = document.querySelector('.nav-btn')
navBtn.addEventListener('click', toggleNav)
