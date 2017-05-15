const router = require('express').Router()
const auth = require('./auth')
const containersModule = require('../../models/containerAPI')

router.get('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		containersModule.getAllContainers((err, containers) => {
			if(err) {
				res.render('admin/errormessage', { message: err, username: req.user.local.name })
			} else {
				res.render('admin/container', { containers, username: req.user.local.name })
			}
		})
	})
})

router.post('/', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body.name) {
			res.redirect('/admin/containers')
		} else {
			if(req.body.name.constructor !== Array) {
				req.body.id = [req.body.id]
				req.body.name = [req.body.name]
				req.body.comment = [req.body.comment]
				req.body.type = [req.body.type]
				req.body.series = [req.body.series]
				req.body.price = [req.body.price]
				req.body.fermentingCapacity = [req.body.fermentingCapacity]
				req.body.storageCapacity = [req.body.storageCapacity]
				req.body.brewingCapacity = [req.body.brewingCapacity]
				req.body.waterProduction = [req.body.waterProduction]
				req.body.electricityProduction = [req.body.electricityProduction]
				req.body.status = [req.body.status]
			}
			const { id, name, comment, type, series, price,
			fermentingCapacity, storageCapacity, brewingCapacity,
			waterProduction, electricityProduction, status } = req.body
			const containers = name.map((_, index) => ({
				id: id[index],
				name: name[index],
				comment: comment[index],
				type: type[index],
				series: series[index],
				price: price[index],
				fermentingCapacity: fermentingCapacity[index],
				storageCapacity: storageCapacity[index],
				brewingCapacity: brewingCapacity[index],
				waterProduction: waterProduction[index],
				electricityProduction: electricityProduction[index],
				status: status[index]
			}))

			const editedContainers = containers.filter(container => container.status === 'edited')
			const removedContainers = containers.filter(container => container.status === 'removed')

			removedContainers.forEach((element) => {
				containersModule.removeContainer(element.id, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err })
						throw err
					}
				})
			})
			editedContainers.forEach((element) => {
				containersModule.updateContainerById(element.id, {
					name: element.name,
					comment: element.comment,
					type: element.type,
					series: element.series,
					price: element.price,
					fermentingCapacity: element.fermentingCapacity,
					storageCapacity: element.storageCapacity,
					brewingCapacity: element.brewingCapacity,
					waterProduction: element.waterProduction,
					electricityProduction: element.electricityProduction
				}, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err })
						throw err
					}
				})
			})
			res.redirect('/admin/containers')
		}
	})
})

router.post('/new', (req, res) => {
	// Require login
	auth.runIfAdmin(req, res, () => {
		if(!req.body.name) {
			res.redirect('/admin/containers')
		} else {
			if(req.body.name.constructor !== Array) {
				req.body.id = [req.body.id]
				req.body.name = [req.body.name]
				req.body.comment = [req.body.comment]
				req.body.type = [req.body.type]
				req.body.series = [req.body.series]
				req.body.price = [req.body.price]
				req.body.fermentingCapacity = [req.body.fermentingCapacity]
				req.body.storageCapacity = [req.body.storageCapacity]
				req.body.brewingCapacity = [req.body.brewingCapacity]
				req.body.waterProduction = [req.body.waterProduction]
				req.body.electricityProduction = [req.body.electricityProduction]
				req.body.status = [req.body.status]
			}
			const { id, name, comment, type, series, price,
			fermentingCapacity, storageCapacity, brewingCapacity,
			waterProduction, electricityProduction, status } = req.body
			const containers = name.map((_, index) => ({
				id: id[index],
				name: name[index],
				comment: comment[index],
				type: type[index],
				series: series[index],
				price: price[index],
				fermentingCapacity: fermentingCapacity[index],
				storageCapacity: storageCapacity[index],
				brewingCapacity: brewingCapacity[index],
				waterProduction: waterProduction[index],
				electricityProduction: electricityProduction[index],
				status: status[index]
			}))
			containers.forEach((element) => {
				containersModule.createContainer({
					name: element.name,
					comment: element.comment,
					type: element.type,
					series: element.series,
					price: element.price,
					fermentingCapacity: element.fermentingCapacity,
					storageCapacity: element.storageCapacity,
					brewingCapacity: element.brewingCapacity,
					waterProduction: element.waterProduction,
					electricityProduction: element.electricityProduction
				}, (err) => {
					if(err) {
						res.render('admin/errormessage', { message: err })
						throw err
					}
				})
			})
			res.redirect('/admin/containers')
		}
	})
})

module.exports = router
