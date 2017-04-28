function loadJSON(url) {
	return new Promise((resolve, reject) => {
		let httpRequest = new XMLHttpRequest()

		try {
			// Opera 8.0+, Firefox, Chrome, Safari
			httpRequest = new XMLHttpRequest()
		} catch (e) {
			// Internet Explorer Browsers
			try {
				httpRequest = new window.ActiveXObject('Msxml2.XMLHTTP')
			} catch (e1) {
				try {
					httpRequest = new window.ActiveXObject('Microsoft.XMLHTTP')
				} catch (e2) {
					reject('Unsupported browser')
				}
			}
		}

		// Setting receive callback
		httpRequest.onreadystatechange = () => {
			if(httpRequest.readyState === 4) {
				if(httpRequest.status === 200) {
					const jsonObj = JSON.parse(httpRequest.responseText)
					resolve(jsonObj)
				} else {
					reject(`Resource not found: ${url}`)
				}
			}
		}

		httpRequest.open('GET', url, true)
		httpRequest.send()
	})
}

module.exports = {
	loadJSON
}
