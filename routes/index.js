const router = require('express').Router()
const browserCheck = require('./helper/browserCheck')

router.get('/', (req, res) => {
	const isSupportedBrowser = browserCheck.isNotExplorer(req)
	res.render('index', { title: 'Home', isSupportedBrowser })
})

module.exports = router

