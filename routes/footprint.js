const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('footprint', { title: 'Our footprint' })
})

module.exports = router

