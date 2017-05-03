function requiresAuth(req, res, target, options) {
	if(req.user) {
		res.render(`Admin/${target}`, options)
	} else {
		res.render('Admin/login', { user: req.user })
	}
}

module.exports = requiresAuth
