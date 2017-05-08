function requiresAuth(req, res, target, options) {
	if(req.user) {
		console.log(req.user.local.name)
		options.username = req.user.local.name
		res.render(`admin/${target}`, options)
	} else {
		res.render('admin/login')
	}
}

module.exports = requiresAuth
