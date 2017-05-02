const router = require('express').Router()
const containersModule = require('../models/containerAPI')
const beerModule = require('../models/beerAPI')


const passport = require('passport')

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next()
	}
	res.redirect('/')
}

function requiresAuth(req, res, target, options) {
	if(req.user) {
		res.render('Admin/' + target, options)
	} else {
		res.render('Admin/login', { user: req.user })
	}
}

router.get('/handletemplates/', (req, res) => {
	requiresAuth(req, res, 'handletemplates', {
		template: 'hello',
		recipient: 'mail@foo.bar',
		subject: 'a subject',
		message: 'lorem ipsum dolore.......'
	})
})

router.get('/handletemplates/edit', (req, res) => {
	requiresAuth(req, res, 'handletemplates')
})

router.get('/calculationform/beer', (req, res) => {
	beerModule.getAllBeerCollections((err, res1) => {
		console.log(res1)
	})

	res.render('editbeertype')
})

router.post('/calculationform/beer', (req, res) => {
	//console.log(req.body)

	if(!req.body.hops) {
		res.redirect('/admin/calculationform/beer')
	}
	const { hops, barley, co2, water, tap1, bottle1, keg1, tap2,
		bottle2, keg2, startValueForProduction } = req.body

	const ingredientCost = JSON.stringify({ hops, barley, co2, water })
	const defaultDistribution = JSON.stringify({ tap1, bottle1, keg1 })
	const defaultCost = JSON.stringify({ tap2, bottle2, keg2 })

	beerModule.updateBeerCollection({
		ingredientCost,
		defaultDistribution,
		defaultCost,
		startValueForProduction
	}, (err, res) => {
		console.log(err)
		console.log(res)

		if(err) {
			throw err
		}
	})
	res.redirect('/admin/calculationform/beer')
})


router.get('/calculationform/container', (req, res) => {
	containersModule.getAllContainers((err, containers) => {
		requiresAuth(req, res, 'container', { containers })
	})
})

router.post('/calculationform/container', (req, res) => {
	console.log(req.body)

	if(!req.body.name) {
		res.redirect('/Admin/calculationform/container')
	} else {
		// Makes values to arrays
		if(req.body.name.constructor !== Array) {
			req.body.id = [req.body.id]
			req.body.name = [req.body.name]
			req.body.type = [req.body.type]
			req.body.price = [req.body.price]
			req.body.size = [req.body.size]
			req.body.status = [req.body.status]
		}

		const { id, name, type, price, size, status } = req.body
		const containers = name.map((_, index) => ({
			id: id[index],
			name: name[index],
			type: type[index],
			price: price[index],
			size: size[index],
			status: status[index]
		}))

		const editedContainers = containers.filter(container => container.status === 'edited')
		const newContainers = containers.filter(container => container.status === 'new')
		const removedContainers = containers.filter(container => container.status === 'removed')

		// Edited
		editedContainers.forEach((element) => {
			containersModule.updateContainerById(element.id, {
				name: element.name,
				type: element.type,
				price: element.price,
				size: element.size
			}, (err) => {
				if(err) {
					throw err
				}
			})
		})
		// new
		newContainers.forEach((element) => {
			containersModule.createContainer({
				name: element.name,
				type: element.type,
				price: element.price,
				size: element.size
			}, (err) => {
				if(err) {
					throw err
				}
			})
		})
		// removed
		removedContainers.forEach((element) => {
			containersModule.removeContainer(element.id, (err) => {
				if(err) {
					throw err
				}
			})
		})
		res.redirect('/Admin/calculationform/container')
	}
})

router.get('/calculationform/beertype', (req, res) => {
	requiresAuth(req, res, 'editbeertype', { user: req.user })
})

router.get('/', (req, res) => {
	requiresAuth(req, res, 'index')
})

router.get('/login', (req, res, next) => {
	requiresAuth(req, res, 'profile', { user: req.user })
})

router.get('/signup', (req, res) => {
	res.render('Admin/signup', { })
})

router.get('Admin/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

router.get('/profile', (req, res) => {
	requiresAuth(req, res, 'profile', { user: req.user })
})

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: 'profile',
	failureRedirect: 'signup',
	failureFlash: true

}))

router.post('/login', passport.authenticate('local-login', {
	successRedirect: 'profile',
	failureRedirect: 'login',
	failureFlash: true

}))

module.exports = router
