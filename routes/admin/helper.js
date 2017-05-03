function requiresAuth(req, res, target, options) {
	if(req.user) {
		res.render(`admin/${target}`, options)
	} else {
		res.render('admin/login')
	}
}

module.exports = requiresAuth
