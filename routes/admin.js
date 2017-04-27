
const router = require('express').Router()
const containersModule = require('../models/containerAPI')
const passport = require('passport');

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

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


router.get('/', (req, res) => {
	res.render('Admin/index')
})


router.get('/login', function(req, res, next) {  
  res.render('Admin/login', {  });
});

router.get('/signup', function(req, res) {  
  res.render('Admin/signup', {  });
});

router.get('Admin/admin', isLoggedIn, function(req, res) {  
  res.render('Admin/admin', { user: req.user });
});

router.get('Admin/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.get('/profile', function(req, res) {
  if(req.user){
    res.render('Admin/profile', { user: req.user });
  }
  else{
    res.render('Admin/login', {user: req.user})
  }
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: 'profile',
  failureRedirect: 'login',
  failureFlash: true
}));


module.exports = router;