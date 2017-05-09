const mongoose = require('mongoose')

const loggerSchema = mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	data: {
		type: Object,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
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

// Statistical stuff
module.exports.updateViews = (page) => {
	const pageLowerCase = page.toLowerCase()
	const sType = 'STAT views'// Selected type
	const sPath = `${pageLowerCase}`
	const query = { type: sType, 'data.path': sPath }
	Logger.findOne(query, (err, log) => {
		if(err) {
			throw err
		} else if(log == null) {
			Logger.log(sType, { count: 1, path: sPath })
		} else {
			const updatedProperties = { data: { count: log.data.count + 1, path: sPath } }
			Logger.update(query, { $set: updatedProperties }, { upsert: true }, (err2) => {
				if(err2) throw err2
			})
		}
	})
}


module.exports.getViews = (callback) => {
	const query = { type: 'STAT views' }
	Logger.find(query).sort({ 'data.count': -1 }).exec(callback)
}

module.exports.logCalcInput = (dataObject) => {
	Logger.log('CALC input', dataObject)
}
