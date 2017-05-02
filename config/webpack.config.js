const path = require('path')

const lintingLoader = {
	test: /\.js?$/,
	exlude: /node_modules/,
	loader: 'eslint'
}

const babelLoader = {
	test: /\.js?$/,
	exlude: /node_modules/,
	loader: 'babel-loader',
	query: {
		presets: ['es2015']
	}
}

module.exports = {
	entry: {
		entry: path.resolve(__dirname, '../src/js/entry.js'),
		adminCont: path.resolve(__dirname, '../src/js/adminCont.js'),
		adminBeer: path.resolve(__dirname, '../src/js/adminBeer.js')
	},
	output: {
		path: path.resolve(__dirname, '../public/js'),
		filename: '[name].js'
	},
	module: {
		preLoaders: [lintingLoader],
		loaders: [babelLoader]
	}
}
