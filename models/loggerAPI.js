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
		default: (new Date())
	}
})

const Logger = mongoose.model('Logger', loggerSchema)
module.exports = Logger

module.exports.log = (logType, logData, callback, month) => {
	let logEntry
	if(month === undefined) {
		logEntry = new Logger({ type: logType, data: logData })
	} else {
		logEntry = new Logger({ type: logType, data: logData, date: (new Date()).setMonth(month) })
	}
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

function getDateObj(monthPar = (new Date()).getMonth(), yearPar = (new Date()).getFullYear()) {
	let month = monthPar
	let year = yearPar
	while(month >= 12) {
		year += 1
		month -= 12
	}
	const from = new Date(year, parseInt(month, 10), 2, 0, 0, 0)
	const to = new Date(year, parseInt(month, 10) + 1, 1, 1, 59, 59, 999)
	return { $gte: from, $lt: to }
}

module.exports.getCalcInput = (dateL, dateT, dateB, dateK, callback) => {
	Logger.find({ type: 'CALC input liters', date: getDateObj(dateL.getMonth(), dateL.getFullYear()) }).sort({ 'data.value': 1 }).exec((err, liters) => {
		Logger.find({ type: 'CALC input tap', date: getDateObj(dateT.getMonth(), dateT.getFullYear()) }).sort({ 'data.value': 1 }).exec((err2, tap) => {
			Logger.find({ type: 'CALC input bottle', date: getDateObj(dateB.getMonth(), dateB.getFullYear()) }).sort({ 'data.value': 1 }).exec((err3, bottle) => {
				Logger.find({ type: 'CALC input keg', date: getDateObj(dateK.getMonth(), dateK.getFullYear()) }).sort({ 'data.value': 1 }).exec((err4, keg) => {
					callback({ liters, tap, bottle, keg })
				})
			})
		})
	})
}

module.exports.CalcInputUpdate = (sType, val) => {
	const query = { type: sType, 'data.value': val, date: getDateObj((new Date()).getMonth()) }
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
