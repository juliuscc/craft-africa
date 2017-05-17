const UAParser = require('ua-parser-js')

function isSupportedBrowser(req, res) {
	const parser = new UAParser()
	const ua = req.headers['user-agent']
	const browserName = parser.setUA(ua).getBrowser().name

	if(browserName === 'IE' || browserName === 'Edge') {
		res.redirect('/update/')
		return false
	}
	return true
}

module.exports = {
	isSupportedBrowser
}
