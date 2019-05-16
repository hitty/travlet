'use strict';
const versionConfig = {
  'value': '%MDS%',
  'append': {
    'key': 'v',
    'to': ['css', 'js'],
  },
};
const gulp = require('gulp'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	less = require('gulp-less'),
	LessPluginAutoPrefixer = require('less-plugin-autoprefixer'),
	autoprefix = new LessPluginAutoPrefixer({
		browsers: ['last 4 versions']
	}),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	rigger = require('gulp-rigger'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	htmlmin = require('gulp-htmlmin'),
	rimraf = require('rimraf'),
	version = require('gulp-version-number'),
	babel = require('gulp-babel');

const path = {
	src: {
		html: 'frontend/*.*',
		js: 'frontend/js/*.*',
		css: 'frontend/less/styles.less',
		img: 'frontend/img/**/*.*',
		fonts: 'frontend/fonts/**/*.*'
	},
	dest: {
		html: 'public/',
		js: 'public/js/',
		css: 'public/css/',
		img: 'public/img/',
		fonts: 'public/fonts/'
	},
	watch: {
		html: 'frontend/**/*.*',
		js: 'frontend/js/**/*.*',
		css: 'frontend/less/*.*',
		img: 'frontend/img/**/*.*',
		fonts: 'frontend/fonts/**/*.*'
	},
	clean: './public'
}

function handleError (error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('html', function(){
	return gulp.src(path.src.html)
	.pipe(rigger())
	.pipe(version(versionConfig))
	.pipe(gulp.dest(path.dest.html))
})

gulp.task('html:min', function(){
	return gulp.src(path.src.html)
	.pipe(rigger())
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(version(versionConfig))
	.pipe(gulp.dest(path.dest.html))
})

gulp.task('css', function(){
	return gulp.src(path.src.css)
	// .pipe(sourcemaps.init())
	.pipe(plumber({
		errorHandler: function (error) {
		gutil.log('Error: ' + error.message);
		this.emit('end');
	}}))
	.pipe(less({
		plugins: [autoprefix]
	}))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest(path.dest.css));
})

gulp.task('css:build', function(){
	return gulp.src(path.src.css)
	.pipe(plumber({
		errorHandler: function (error) {
		gutil.log('Error: ' + error.message);
		this.emit('end');
	}}))
	.pipe(less({
		plugins: [autoprefix]
	}))
	.pipe(gulp.dest(path.dest.css));
})

gulp.task('css:min', function () {
	return gulp.src(path.src.css)
	.pipe(plumber({
		errorHandler: function (error) {
		gutil.log('Error: ' + error.message);
		this.emit('end');
	}}))
	.pipe(less({
		plugins: [autoprefix]
	}))
	.pipe(cssmin())
	.pipe(gulp.dest(path.dest.css))
});

gulp.task('js', function () {
   return gulp.src(path.src.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.on('error', handleError)
		.pipe(rigger())
		// .pipe(sourcemaps.init())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dest.js))
});

gulp.task('js:build', function () {
   return gulp.src(path.src.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.on('error', handleError)
		.pipe(rigger())
		.pipe(gulp.dest(path.dest.js))
});

gulp.task('js:min', function () {
   return gulp.src(path.src.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.on('error', handleError)
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest(path.dest.js))
});

gulp.task('img', function () {
	return gulp.src(path.src.img, {cwd: process.cwd()})
	.pipe(gulp.dest(path.dest.img, {cwd: process.cwd()}))
});

gulp.task('img:min', function () {
	return gulp.src(path.src.img, {cwd: process.cwd()})
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{
			removeViewBox: false
		}],
		use: [pngquant()],
		interlaced: true
	}))
	.pipe(gulp.dest(path.dest.img, {cwd: process.cwd()}))
});
gulp.task('fonts', function(){
	return gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.dest.fonts))
})


gulp.task('watch', function () {
	gulp.watch(path.watch.html, gulp.series('html'));
	gulp.watch(path.watch.css, gulp.series('css'));
	gulp.watch(path.watch.js, gulp.series('js'));
	gulp.watch(path.watch.img, gulp.series('img'));
	gulp.watch(path.watch.fonts, gulp.series('fonts'));
});

gulp.task('default', gulp.series('html', 'css', 'js', 'img', 'fonts', 'watch'));
gulp.task('min', gulp.series('clean', 'html:min', 'css:min', 'js:min', 'img', 'fonts'));
gulp.task('build', gulp.series('clean', 'html', 'css:build', 'js:build', 'img', 'fonts'));