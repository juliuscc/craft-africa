/* ~ ~ ~ INIT ~ ~ ~ */

// Elementary objects
const gulp = require('gulp')
const gutil = require('gulp-util')
const path = require('path')
const plumber = require('gulp-plumber')
const Cache = require('gulp-file-cache')
const nodemon = require('gulp-nodemon')

const cache = new Cache()

// Paths and environment
const environments = require('gulp-environments')

const paths = {
	src: path.resolve(__dirname, 'src'),
	dest: path.resolve(__dirname, 'public')
}
// const development = environments.development
const production = environments.production

/* ~ ~ ~ Error Handler ~ ~ ~ */
function errorHandler(err) {
	const message = err.message.replace(/\n/g, '\n      ')

	gutil.log(`|- ${gutil.colors.bgRed.bold(`Build Error in ${err.plugin}`)}`)
	gutil.log(`|- ${gutil.colors.bgRed('>>>')}`)
	gutil.log(`|\n    ${message}\n           |`)
	gutil.log(`|- ${gutil.colors.bgRed('<<<')}`)

	this.emit('end')
}

/* ~ ~ ~ Style ~ ~ ~ */
const scss = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')

gulp.task('style', () => {
	const src = `${paths.src}/stylesheets/main.scss`
	const dest = `${paths.dest}/stylesheets`

	return gulp.src(src)
		.pipe(plumber(errorHandler))
		.pipe(cache.filter())
		.pipe(scss())
		.pipe(autoprefixer())
		.pipe(production(cleanCSS()))
		.pipe(cache.cache())
		.pipe(plumber.stop())
		.pipe(gulp.dest(dest))
})

gulp.task('admin-style', () => {
	const src = `${paths.src}/admin-stylesheet/admin-stylesheet.scss`
	const dest = `${paths.dest}/stylesheets`

	return gulp.src(src)
		.pipe(plumber(errorHandler))
		.pipe(cache.filter())
		.pipe(scss())
		.pipe(autoprefixer())
		.pipe(production(cleanCSS()))
		.pipe(cache.cache())
		.pipe(plumber.stop())
		.pipe(gulp.dest(dest))
})

/* ~ ~ ~ JS / JSX ~ ~ ~ */
const webpack = require('webpack-stream')
const webpackConf = require('./config/webpack.config.js')
const uglify = require('gulp-uglify')

gulp.task('js', () => {
	const src = `${paths.src}/js/**/*.js`
	const dest = `${paths.dest}/js`

	return gulp.src(src)
		.pipe(plumber(errorHandler))
		.pipe(webpack(webpackConf))
		.pipe(production(uglify()))
		.pipe(plumber.stop())
		.pipe(gulp.dest(dest))
})

/* ~ ~ ~ Bower assets ~ ~ ~ */
gulp.task('load-bower', () => {
	const src = path.resolve(__dirname, 'bower_components')

	// Normalize
	gulp.src(`${src}/normalize-css/normalize.css`)
	.pipe(gulp.dest(`${paths.dest}/stylesheets`))

	// Font awesome
	return gulp.src(`${src}/font-awesome/fonts/*`)
	.pipe(gulp.dest(`${paths.dest}/fonts`))
})

/* ~ ~ ~ Stream and task handling ~ ~ ~ */
gulp.task('watch', () => {
	gulp.start('style', 'admin-style', 'js', 'load-bower')

	// Style
	gulp.watch(`${paths.src}/stylesheets/**`, ['style'])
	gulp.watch(`${paths.src}/admin-stylesheet/**`, ['admin-style'])

	// JS / JSX
	gulp.watch(`${paths.src}/js/**`, ['js'])
})

// Handling server
gulp.task('nodemon', () => {
	const stream = nodemon({
		script: 'app.js',
		watch: ['routes', 'app.js', 'config', 'models']
	})
		.on('restart', () => {
			gutil.log('restarted!')
		})
		.on('crash', () => {
			gutil.log('Application has crashed!\n')
			stream.emit('restart', 10)  // restart the server in 10 seconds
		})

	return stream
})

gulp.task('default', ['nodemon', 'watch'])
gulp.task('build', ['style', 'admin-style', 'js', 'load-bower'])
