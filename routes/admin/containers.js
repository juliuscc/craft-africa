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
		res.redirect('/admin/container')
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
		res.redirect('/admin/container')
	}
})

module.exports = router
