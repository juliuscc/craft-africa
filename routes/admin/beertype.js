const router = require('express').Router()
const auth = require('./auth')
const beerTypesModule = require('../../models/beerTypeAPI')

router.get('/', (req, res) => {
	// console.log('test')
	// Run if logged in
	auth.runIfAdmin(req, res, () => {
		beerTypesModule.getAllBeers((err, beerTypes) => {
			// console.log('beer: ', beerTypes)
			if(err) {
				res.render('admin/errormessage', { message: err, username: req.user.local.name })
			} else {
				res.render('admin/beertype', { beerTypes, username: req.user.local.name })
			}
		})
	})
})

router.post('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body.name) {
			res.redirect('/admin/beertype')
		} else {
			if(req.body.name.constructor !== Array) {
				req.body.id = [req.body.id]
				req.body.name = [req.body.name]
				req.body.fermentingTime = [req.body.fermentingTime]
				req.body.hops = [req.body.hops]
				req.body.malt = [req.body.malt]
				req.body.co2 = [req.body.co2]
				req.body.status = [req.body.status]
			}
			const { id, name, fermentingTime, hops, malt, co2, status } = req.body

			const beerTypes = name.map((_, index) => ({
				id: id[index],
				name: name[index],
				fermentingTime: fermentingTime[index],
				ingredient: JSON.stringify({
					hops: hops[index],
					malt: malt[index],
					co2: co2[index]
				}),
				status: status[index]
			}))

			const editedBeerTypes = beerTypes.filter(beerType => beerType.status === 'edited')
			const removedBeerTypes = beerTypes.filter(beerType => beerType.status === 'removed')

			removedBeerTypes.forEach((element) => {
				beerTypesModule.removeBeer(element.id, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err })
						throw err
					}
				})
			})

			editedBeerTypes.forEach((element) => {
				beerTypesModule.updateBeerById(element.id, {
					name: element.name,
					fermentingTime: element.fermentingTime,
					ingredient: element.ingredient
				}, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err })
						throw err
					}
				})
			})
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
				req.body.fermentingTime = [req.body.fermentingTime]
				req.body.hops = [req.body.hops]
				req.body.malt = [req.body.malt]
				req.body.co2 = [req.body.co2]
				req.body.status = [req.body.status]
			}
			const { id, name, fermentingTime, hops, malt, co2, status } = req.body

			const beers = name.map((_, index) => ({
				id: id[index],
				name: name[index],
				fermentingTime: fermentingTime[index],
				ingredient: JSON.stringify({
					hops: hops[index],
					malt: malt[index],
					co2: co2[index]
				}),
				status: status[index]
			}))

			console.log('beeeeers: ', beers)

			beers.forEach((element) => {
				beerTypesModule.createBeer({
					name: element.name,
					fermentingTime: element.fermentingTime,
					ingredient: element.ingredient
				}, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err, username: req.user.local.name })
						throw err
					}
				})
			})
			res.redirect('/admin/beertype')
		}
	})
})


module.exports = router
