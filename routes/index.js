const router = require('express').Router()
var passport = require('passport');

router.get('/', (req, res) => {
	res.render('index')
})




router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {  
  res.render('login', {  });
});

router.get('/signup', function(req, res) {  
  res.render('signup', {  });
});

router.get('/admin', isLoggedIn, function(req, res) {  
  res.render('admin', { user: req.user });
});

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));


module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
