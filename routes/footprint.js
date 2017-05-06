const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('footprint')
})

module.exports = router

