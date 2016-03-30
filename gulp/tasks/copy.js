var gulp = require('gulp'),
	cfg = require('../config');

cfg.project.forEach(function(pro){
	var name = pro.alias, 
		src = pro.src,
		build = pro.build,
		taskHtml = 'copy:'+name+'_html',
		taskCss = 'copy:'+name+'_css',
		taskAssets = 'copy:'+name+'_assets',
		taskVendors = 'copy:'+name+'_vendors',
		taskUeditor = 'copy:'+name+'_ueditor',
		taskBoot = 'copy:'+name+'_boot';

	/*==copy html==*/
	gulp.task(taskHtml,function(){
		return gulp.src([src+'*.html',src+'app/**/*.html'],{base:src})
				.pipe(gulp.dest(build));
	});

	/*==copy css==*/
	gulp.task(taskCss,function(){
		return gulp.src(src+'css/**',{base:src})
				.pipe(gulp.dest(build));
	});

	/*==copy css==*/
	gulp.task(taskAssets,function(){
		return gulp.src(src+'assets/**',{base:src})
				.pipe(gulp.dest(build));
	});

	/*==copy vendors==*/
	gulp.task(taskVendors,function(){
		var vendors = cfg.getVendors(pro);

		return gulp.src(vendors,{base:src})
				.pipe(gulp.dest(build));
	});

	/*==copy boot==*/
	gulp.task(taskBoot,function(){
		return gulp.src(src+'boot.js')
				.pipe(gulp.dest(build));
	});

    /*==copy ueditor==*/
    gulp.task(taskUeditor,function(){
        return gulp.src(src+'vendor/angular-ueditor/**',{base:src})
            .pipe(gulp.dest(build));
    });

	gulp.task('copy:'+ name,[taskHtml,taskCss,taskAssets,taskVendors,taskBoot,taskUeditor]);

});










