const router = require('express').Router()
const requiresAuth = require('./helper')
const beerType = require('../../models/beerTypeAPI')

router.get('/', (req, res) => {
	beerType.getAllBeers((err, values) => {
		if(!values.name) {
			const empty = {
				name: '',
				defaultDistribution: '',
				ingrediensUsage: {
					hops: '',
					malt: '',
					co2: ''
				}
			}
			requiresAuth(req, res, 'beertype', empty)
		} else {
			requiresAuth(req, res, 'beertype', values)
		}
	})
})

router.post('/', (req, res) => {
	res.redirect('/admin/beer')
})


module.exports = router
