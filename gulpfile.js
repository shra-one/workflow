var gulp=require('gulp');
	sass=require('gulp-sass');
	browserSync=require('browser-sync').create();




//path

var sourcepath={
	sass:'src/scss/*.scss',
	js:'src/js/*.js'
}

var apppath={
	css:'app/css/',
	js:'app/js/',
	root:'app/'
}


//gulp task

gulp.task('sass', function(){
	return gulp
			.src(sourcepath.sass)
			.pipe(sass({
				outputStyle:'compressed'
				})
				.on('error', sass.logError)
				)
			.pipe(gulp.dest(apppath.css))
			.pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: apppath.root
    });

    gulp.watch(sourcepath.sass, ['sass']);
    gulp.watch(apppath.root +'*.html').on('change', browserSync.reload);
});

 

gulp.task('default', ['serve']);