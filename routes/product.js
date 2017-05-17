const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('product', { title: 'Our Product' })
})

module.exports = router
