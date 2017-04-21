const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('email')
})

module.exports = router
