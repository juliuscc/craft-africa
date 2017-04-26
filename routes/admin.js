const router = require('express').Router()

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
	res.render('editcontainer', { containers: [
		{
			id: 13123,
			name: 'name',
			type: 'type',
			price: 'price',
			size: 'size'
		},
		{
			id: 12341,
			name: 'name',
			type: 'type',
			price: 'price',
			size: 'size'
		},
		{
			id: 123423,
			name: 'test',
			type: 'test',
			price: 'test',
			size: 'test'
		}
	] })
})

router.post('/calculationform/container', (req, res) => {
	const { id, name, type, price, size, status } = req.body
	// Kinda like a for each loop
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



	console.log(editedContainers)
	console.log(newContainers)
	console.log(removedContainers)
	res.redirect('/admin/calculationform/container')
})

router.get('/calculationform/beertype', (req, res) => {
	res.render('editbeertype')
})

module.exports = router
