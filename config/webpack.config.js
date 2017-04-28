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
		calculationForm: path.resolve(__dirname, '../src/js/calculationForm.js'),
		entry: path.resolve(__dirname, '../src/js/entry.js')
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
