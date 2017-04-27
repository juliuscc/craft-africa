let router = express.Router();

router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {  
  res.render('login', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {  
  res.render('signup', { message: req.flash('signupMessage') });
});

router.get('/profile', isLoggedIn, function(req, res) {  
  res.render('profile', { user: req.user });
});

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}