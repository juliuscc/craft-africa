const UAParser = require('ua-parser-js')

function isSupportedBrowser(req) {
	const parser = new UAParser()
	const ua = req.headers['user-agent']
	const browserName = parser.setUA(ua).getBrowser().name

	return (browserName !== 'IE' && browserName !== 'Edge')
}

function isNotExplorer(req) {
	const parser = new UAParser()
	const ua = req.headers['user-agent']
	const browserName = parser.setUA(ua).getBrowser().name

	return (browserName !== 'IE')
}


module.exports = {
	isSupportedBrowser,
	isNotExplorer
}
