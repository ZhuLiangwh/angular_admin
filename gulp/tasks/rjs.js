var gulp = require('gulp'),
	rjs = require('gulp-requirejs'),
	uglify = require('gulp-uglify'),
    argv = require('yargs').argv,
	cfg = require('../config');

cfg.project.forEach(function(pro){
	gulp.task('requirejs:'+ pro.alias,function(){
		rjs({
			baseUrl:pro.src + 'app/',
			out:'bootstrap.js',
			name: 'bootstrap',
			paths: {
	            'domReady': '../vendor/requirejs-domready/domReady',
	            'text': '../vendor/requirejs-text/text'
	        },
	        onBuildRead:function(moduleName, path, contents){
                if(path.indexOf('app.config.module') > -1){
                    contents = argv.release ? contents.replace(/\'ENV\'\s*\,[^)]+?\)/i, "'ENV' , 'release')") : argv.beta ? contents.replace(/\'ENV\'\s*\,[^)]+?\)/i, "'ENV' , 'beta')") : contents;
                }
		        return path.indexOf('init') > -1 ?  contents.replace(/\/src\//i, "/build/") : contents
		    }
		})
		.pipe(uglify())
		.pipe(gulp.dest(pro.build + 'app/'))
	});

});
