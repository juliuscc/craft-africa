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

module.exports.getCalcInput = (callback) => {
	Logger.find({ type: 'CALC input liters' }).sort({ 'data.value': 1 }).exec((err, liters) => {
		Logger.find({ type: 'CALC input tap' }).sort({ 'data.value': 1 }).exec((err2, tap) => {
			Logger.find({ type: 'CALC input bottle' }).sort({ 'data.value': 1 }).exec((err3, bottle) => {
				Logger.find({ type: 'CALC input keg' }).sort({ 'data.value': 1 }).exec((err4, keg) => {
					callback({ liters, tap, bottle, keg })
				})
			})
		})
	})
}

module.exports.CalcInputUpdate = (sType, val) => {
	const query = { type: sType, 'data.value': val }
	Logger.findOne(query, (err, log) => {
		if(err) {
			throw err
		} else if(log == null) {
			Logger.log(sType, { count: 1, value: val })
		} else {
			const updatedProperties = { data: { value: log.data.value, count: log.data.count + 1 } }
			Logger.update(query, { $set: updatedProperties }, { upsert: true }, (err2) => {
				if(err2) throw err2
			})
		}
	})
}

module.exports.logCalcInput = (dataObject) => {
	Logger.CalcInputUpdate('CALC input liters', dataObject.total)
	Logger.CalcInputUpdate('CALC input tap', dataObject.tap)
	Logger.CalcInputUpdate('CALC input bottle', dataObject.bottle)
	Logger.CalcInputUpdate('CALC input keg', dataObject.keg)
}
