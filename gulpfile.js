var gulp=require('gulp');
	sass=require('gulp-sass');





//gulp task

gulp.task('sass', function(){
	return gulp
			.src('src/scss/app.scss')
			.pipe(sass({
				outputStyle:'compressed'
				})
				.on('error', sass.logError)
				)
			.pipe(gulp.dest('app/css/'))
});

gulp.task('default', ['sass']);