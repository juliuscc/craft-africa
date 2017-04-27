const router = require('express').Router()
const containersModule = require('../models/containerAPI')

router.get('/handletemplates/', (req, res) => {
	res.render('handletemplates', {
		template: 'hello',
		recipient: 'mail@foo.bar',
		subject: 'a subject',
		message: 'lorem ipsum dolore.......'
	})
})

router.get('/handletemplates/edit', (req, res) => {
	res.render('handletemplates')
})

router.get('/calculationform/container', (req, res) => {
	containersModule.getAllContainers((err, containers) => {
		res.render('editcontainer', { containers })
	})
})
router.post('/calculationform/container', (req, res) => {

	if(!req.body.name) {
		res.redirect('/admin/calculationform/container')
	}
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
		_id: id[index],
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
		containersModule.updateContainerById(element._id, { name: element.name, type: element.type, 
			price: element.price, size: element.size }, (err, res) => {
			console.log(err)
		})
	})


	// new
	newContainers.forEach((element) => {
		containersModule.createContainer({ name: element.name, type: element.type, 
			price: element.price, size: element.size }, (err, res) => {
				
				console.log(err)
		})
		
	})

	// removed
	removedContainers.forEach((element) => {
		containersModule.removeContainer(element._id, (err, res) => {
			console.log(err)
		})
	})


	res.redirect('/admin/calculationform/container')
})

router.get('/calculationform/beertype', (req, res) => {
	res.render('editbeertype')
})

module.exports = router
