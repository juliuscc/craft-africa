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
		adminDefaultValues: path.resolve(__dirname, '../src/js/adminDefaultValues.js'),
		adminBeertype: path.resolve(__dirname, '../src/js/adminBeertype.js'),
		adminUsers: path.resolve(__dirname, '../src/js/adminUsers.js'),
		explosionView: path.resolve(__dirname, '../src/js/explosionView.js'),
		calculationForm: path.resolve(__dirname, '../src/js/calculationForm.js'),
		calculationSlider: path.resolve(__dirname, '../src/js/calculationSlider.js'),
		navbar: path.resolve(__dirname, '../src/js/navbar.js'),
		navbarsmall: path.resolve(__dirname, '../src/js/navbar-small.js'),
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
			vue$: 'vue/dist/vue.min.js' // , // 'vue/dist/vue.common.js' for webpack 1
			// 'vue-prod$': 'vue/dist/vue.runtime.min.js' // 'vue/dist/vue.common.js' for webpack 1
		}
	}
}
