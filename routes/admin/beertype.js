const router = require('express').Router()
const auth = require('./auth')
const beerType = require('../../models/beerTypeAPI')

router.get('/', (req, res) => {
	// Run if logged in
	auth.runIfAdmin(req, res, () => {
		beerType.getAllBeers((err, values) => {
			if(err) {
				throw err
			}
			res.render('admin/beertype', { values, username: req.user.local.name })
		})
	})
})

router.post('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body.name) {
			// Redirect if no data is submitted
			res.redirect('/admin/beertype')
		} else {
			const { id, name, fermenting, hops, malt, co2, status } = req.body
			const ingredient = JSON.stringify({ hops, malt, co2 })
			if(status === 'removed') {
				beerType.removeBeer(id, (err) => {
					if(err) {
						throw err
					}
				})
			} else {
				beerType.updateBeerById(id, {
					name,
					fermenting,
					ingredient
				}, (err) => {
					if(err) {
						throw err
					}
				})
			}
			res.redirect('/admin/beertype')
		}
	})
})

router.post('/new', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body.name) {
			// Redirect if no data is submitted
			res.redirect('/admin/beertype')
		} else {
			if(req.body.name.constructor !== Array) {
				req.body.id = [req.body.id]
				req.body.name = [req.body.name]
				req.body.fermenting = [req.body.fermenting]
				req.body.hops = [req.body.hops]
				req.body.malt = [req.body.malt]
				req.body.co2 = [req.body.co2]
				req.body.status = [req.body.status]
			}
			const { id, name, fermenting, hops, malt, co2, status } = req.body
			const beers = name.map((_, index) => ({
				id: id[index],
				name: name[index],
				fermenting: fermenting[index],
				hops: hops[index],
				malt: malt[index],
				co2: co2[index],
				status: status[index]
			}))

			beers.forEach((element) => {
				const ingredient = JSON.stringify({
					hops: element.hops,
					malt: element.malt,
					co2: element.co2
				})
				beerType.createBeer({
					name: element.name,
					fermenting: element.fermenting,
					ingredient
				}, (err) => {
					if(err) {
						throw err
					}
				})
			})
			res.redirect('/admin/beertype')
		}
	})
})


module.exports = router
