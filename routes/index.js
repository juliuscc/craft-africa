const router = require('express').Router()
const browserCheck = require('./helper/browserCheck')

router.get('/', (req, res) => {
	const isSupportedBrowser = browserCheck.isSupportedBrowser(req)
	res.render('index', { title: 'Home', isSupportedBrowser })
})

module.exports = router

