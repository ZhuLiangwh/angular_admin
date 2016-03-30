var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	minifycss = require('gulp-minify-css'),
	//rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sequence = require('run-sequence'),
	cfg = require('../config');

var watchTask = [];

cfg.project.forEach(function(pro){
	var src = pro.src + 'scss/**/*.scss';
	gulp.task('sass:'+ pro.alias,function(){
		return gulp.src(src)
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(concat('app.css'))
           .pipe(minifycss())
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(pro.src + 'css/'));
	});

	// gulp.task('sass:'+ pro.alias, function () {
	// 	return sass(src, { sourcemap: true })
	// 		.on('error', sass.logError)
	// 		.pipe(concat('app.css'))
	// 		.pipe(minifycss())
	// 		// For inline sourcemaps
	// 		.pipe(sourcemaps.write('./maps'))
	// 		.pipe(gulp.dest(pro.src + 'css/'));
	// });

	gulp.task('watch:'+pro.alias,function(){
		gulp.watch(src,['sass:'+ pro.alias]);
	});

	watchTask.push('watch:'+pro.alias);
});

gulp.task('watch',function(){
	sequence.apply(null,watchTask);
});