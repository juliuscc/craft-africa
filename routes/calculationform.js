const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('calculationform')
})

module.exports = router
