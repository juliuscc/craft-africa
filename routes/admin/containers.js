const router = require('express').Router()
const requiresAuth = require('./helper')
const containersModule = require('../../models/containerAPI')

router.get('/', (req, res) => {
	containersModule.getAllContainers((err, containers) => {
		requiresAuth(req, res, 'container', { containers })
	})
})

router.post('/', (req, res) => {
	if(!req.body.name) {
		res.redirect('/admin/containers')
	} else {
		const { id, name, type, series, price,
		fermentingCapacity, storageCapacity, brewingCapacity,
		waterProduction, electricityProduction, status } = req.body
		if(status === 'removed') {
			containersModule.removeContainer(id, (err) => {
				if(err) {
					throw err
				}
			})
		} else {
			containersModule.updateContainerById(id, {
				name,
				type,
				series,
				price,
				fermentingCapacity,
				storageCapacity,
				brewingCapacity,
				waterProduction,
				electricityProduction
			}, (err) => {
				if(err) {
					throw err
				}
			})
		}
		res.redirect('/admin/containers')
	}
})

router.post('/new', (req, res) => {
	if(!req.body.name) {
		res.redirect('/admin/containers')
	} else {
		if(req.body.name.constructor !== Array) {
			req.body.id = [req.body.id]
			req.body.name = [req.body.name]
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
		const { id, name, type, series, price,
		fermentingCapacity, storageCapacity, brewingCapacity,
		waterProduction, electricityProduction, status } = req.body
		const containers = name.map((_, index) => ({
			id: id[index],
			name: name[index],
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
					throw err
				}
			})
		})
		res.redirect('/admin/containers')
	}
})


/*
router.post('/new', (req, res) => {
	if(!req.body.name) {
		res.redirect('/admin/containers')
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
		res.redirect('/admin/containers')
	}
})

*/
module.exports = router
