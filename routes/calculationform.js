const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	res.render('calculationform')
})

router.post('/', (req, res, next) => {
	console.log(req.body.input1)
	console.log(req.body)
	res.render('calculationform', req.body)
})

module.exports = router
