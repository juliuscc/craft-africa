function requiresAuth(req, res, target, options) {
	if(req.user) {
		res.render(`admin/${target}`, options)
	} else {
		res.render('admin/login')
	}
}

function runIfAdmin(req, res, callback) {
	if(req.user) {
		callback()
	} else {
		res.render('admin/login')
	}
}

module.exports = {
	requiresAuth,
	runIfAdmin
}
