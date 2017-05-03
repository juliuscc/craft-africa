function requiresAuth(req, res, target, options) {
	if(req.user) {
		res.render(`admin/${target}`, options)
	} else {
		res.render('admin/login', { user: req.user })
	}
}

module.exports = requiresAuth
