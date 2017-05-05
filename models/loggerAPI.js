const mongoose = require('mongoose')

const loggerSchema = mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	data: {
		type: Object,
		required: true
	}
})

const Logger = mongoose.model('Logger', loggerSchema)
module.exports = Logger

module.exports.log = (logType, logData, callback) => {
	const logEntry = new Logger({ type: logType, data: logData })
	logEntry.save(callback)
}

module.exports.getLogByType = (logType, callback) => {
	const query = { type: logType }
	Logger.find(query, callback)
}
