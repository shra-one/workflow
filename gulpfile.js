var gulp=require('gulp'),
	sass=require('gulp-sass'),
	browserSync=require('browser-sync').create(),
	autoprefixer=require('gulp-autoprefixer'),
	clean=require('gulp-clean'),
	concat=require('gulp-concat');




//path

var sourcepath={
	sass:'src/scss/*.scss',
	js:'src/js/**/*.js',
	html:'src/*.html'
}

var apppath={
	css:'app/css/',
	js:'app/js/',
	root:'app/'
}


//gulp task

gulp.task('clean-html', function(){
	return gulp.src(apppath.root +'*.html', {read:false, force:true})
				.pipe(clean())
				
});

gulp.task('clean-js', function(){
	return gulp.src(apppath.js+'*.js ', {read:false, force:true})
				.pipe(clean())
});

gulp.task('clean-css', function(){
	return gulp.src(apppath.css+'*.css ', {read:false, force:true})
				.pipe(clean())
});

gulp.task('copy', ['clean-html'], function(){
	gulp.src(sourcepath.html)
		.pipe(gulp.dest(apppath.root));
})
gulp.task('sass',['clean-css'],  function(){
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

gulp.task('scripts', ['clean-js'], function(){
	return gulp.src(sourcepath.js)
				.pipe(concat('main.js'))
				.pipe(gulp.dest(apppath.js))

});

gulp.task('serve', ['sass'], function(){
	browserSync.init([apppath.css +'*.css', apppath.root + '*.html', apppath.js + '*.js'], {
		server:{
			baseDir:apppath.root
		}
	})

});


gulp.task('watch', ['serve', 'sass', 'copy', 'scripts'],  function(){
	gulp.watch(sourcepath.sass, ['sass']);
	gulp.watch(sourcepath.html, ['copy']);
	gulp.watch(sourcepath.js, ['scripts']);
})
gulp.task('default', ['watch']);