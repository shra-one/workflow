var gulp=require('gulp');
	sass=require('gulp-sass');
	browserSync=require('browser-sync').create();
	autoprefixer=require('gulp-autoprefixer');




//path

var sourcepath={
	sass:'src/scss/*.scss',
	js:'src/js/*.js',
	html:'src/*.html'
}

var apppath={
	css:'app/css/',
	js:'app/js/',
	root:'app/'
}


//gulp task

gulp.task('copy', function(){
	gulp.src(sourcepath.html)
		.pipe(gulp.dest(apppath.root));
})
gulp.task('sass', function(){
	return gulp
			.src(sourcepath.sass)
			.pipe(autoprefixer())
			.pipe(sass({
				outputStyle:'expanded'
				})
				.on('error', sass.logError)
				)
			.pipe(gulp.dest(apppath.css))
});

gulp.task('serve', ['sass'], function(){
	browserSync.init([apppath.css +'*.css', apppath.root + '*.html', apppath.js + '*.js'], {
		server:{
			baseDir:apppath.root
		}
	})

});


gulp.task('watch', ['serve', 'sass', 'copy'],  function(){
	gulp.watch(sourcepath.sass, ['sass']);
	gulp.watch(sourcepath.html, ['copy']);
})
gulp.task('default', ['watch']);