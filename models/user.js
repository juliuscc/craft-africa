const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
	local: {
		name: String,
		email: String,
		password: String
	}
})

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User


module.exports.getAllUsers = (callback) => {
	const query = {}
	User.find(query, callback)
}
module.exports.removeUser = (id, callback) => {
	const query = { _id: id }
	User.remove(query, callback)
}
