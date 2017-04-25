const router = require('express').Router()
var passport = require('passport');

router.get('/', (req, res) => {
	res.render('index')
})




router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {  
  res.render('Admin/login', {  });
});

router.get('/signup', function(req, res) {  
  res.render('Admin/signup', {  });
});

router.get('/admin', isLoggedIn, function(req, res) {  
  res.render('admin', { user: req.user });
});

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.get('/profile', function(req, res) {
  res.render('Admin/profile', { user: req.user });
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: 'profile',
  failureRedirect: 'login',
  failureFlash: true,
}));


module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
