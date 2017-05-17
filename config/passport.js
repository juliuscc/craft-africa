const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user)
		})
	})

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done) => {
		if(req.user) {
			process.nextTick(() => {
				User.findOne({ 'local.email': email }, (err, user) => {
					if(err) {
						return done(err)
					}
					if(user) {
						return done(null, false, req.flash('signupMessage', 'That email is already in use.'))
					}

					const newUser = new User()
					newUser.local.email = email
					newUser.local.password = newUser.generateHash(password)
					newUser.local.name = req.body.name
					newUser.save((err2) => {
						if(err2) {
							throw err2
						}
						return done(null, false)
					})
				})
			})
		} else {
			return done(null, false, req.flash('signupMessage', 'You must be logged in to perform this action.'))
		}
	}))

//   passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done) => {
		User.findOne({ 'local.email': email }, (err, user) => {
			if(err) {
				return done(err)
			}
			if(!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'))
			}
			if(!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Wrong password.'))
			}
			return done(null, user)
		})
	}))
}
