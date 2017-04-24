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
			name: 'name',
			type: 'type',
			price: 'price',
			size: 'size'
		},
		{
			name: 'name',
			type: 'type',
			price: 'price',
			size: 'size'
		},
		{
			name: 'test',
			type: 'test',
			price: 'test',
			size: 'test'
		}
	] })
})

router.post('/calculationform/container', (req, res) => {

	const { name, type, price, size } = req.body
	// Kinda like a for each loop
	const containers = name.map((_, index) => {
		return {
			name: name[index],
			type: type[index],
			price: price[index],
			size: size[index]
		}
	})
	console.log(containers)
	res.redirect('/admin/calculationform/container')
})

router.get('/calculationform/beertype', (req, res) => {
	res.render('editbeertype')
})

module.exports = router
