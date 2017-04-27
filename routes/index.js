const router = require('express').Router()
var passport = require('passport');

router.get('/', (req, res) => {
	res.render('index')
})

module.exports = router;

