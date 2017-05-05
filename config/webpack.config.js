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
		adminCont: path.resolve(__dirname, '../src/js/adminCont.js'),
		adminBeer: path.resolve(__dirname, '../src/js/adminBeer.js'),
		explosionView: path.resolve(__dirname, '../src/js/explosionView.js'),
		calculationForm: path.resolve(__dirname, '../src/js/calculationForm.js'),
		'admin/statistics': path.resolve(__dirname, '../src/js/admin/statistics.js')
	},
	output: {
		path: path.resolve(__dirname, '../public/js'),
		filename: '[name].js'
	},
	module: {
		preLoaders: [lintingLoader],
		loaders: [babelLoader]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
		}
	}
}
