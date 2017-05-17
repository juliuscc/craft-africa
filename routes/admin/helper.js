function requiresAuth(req, res, target, options) {
	if(req.user) {
		options.username = req.user.local.name
		res.render(`admin/${target}`, options)
	} else {
		res.render('admin/login')
	}
}

module.exports = requiresAuth
