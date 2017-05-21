var gulp=require('gulp'),
	sass=require('gulp-sass'),
	browserSync=require('browser-sync').create(),
	autoprefixer=require('gulp-autoprefixer'),
	clean=require('gulp-clean'),
	concat=require('gulp-concat'),
	browserify=require('gulp-browserify'),
	merge=require('merge-stream'),
	newer=require('gulp-newer'),
	imagemin=require('gulp-imagemin'),
	partials=require('gulp-inject-partials'),
	minify=require('gulp-minify'),
	rename=require('gulp-rename'),
	cssmin=require('gulp-cssmin');



//path

var sourcepath={
	sass:'src/scss/*.scss',
	js:'src/js/**/*.js',
	html:'src/*.html',
	htmlpartial:'src/partials/*.html',
	image:'src/img/**'
}

var apppath={
	css:'app/css/',
	js:'app/js/',
	root:'app/',
	fonts:'app/fonts',
	image:'app/img/'
}


//gulp task

gulp.task('html', function(){
	return gulp.src(sourcepath.html)
			.pipe(partials())
			.pipe(gulp.dest(apppath.root));
});

gulp.task('images', function(){
	return gulp.src(sourcepath.image)
			.pipe(newer(apppath.image))
			.pipe(imagemin())
			.pipe(gulp.dest(apppath.image));
});

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
/*
gulp.task('copy', ['clean-html'], function(){
	gulp.src(sourcepath.html)
		.pipe(gulp.dest(apppath.root));
})*/
gulp.task('sass',  function(){

	var bootstrapfiles=gulp.src('node_modules/bootstrap/dist/css/bootstrap.css');
	var sassfiles;
	sassfiles= gulp
			.src(sourcepath.sass)
			.pipe(autoprefixer())
			.pipe(sass({
				outputStyle:'expanded'
				})
				.on('error', sass.logError)
				)
			return merge(bootstrapfiles, sassfiles)
			.pipe(concat('main.css'))
			.pipe(gulp.dest(apppath.css))
});

gulp.task('movefonts', function(){
	return gulp.src('node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}')
	.pipe(gulp.dest(apppath.fonts))
})
gulp.task('scripts', ['clean-js'], function(){
	return gulp.src(sourcepath.js)
				.pipe(concat('main.js'))
				.pipe(browserify())
				.pipe(gulp.dest(apppath.js))

});

/* production task starts--------------------*/
gulp.task('compress', function(){
	return gulp.src(sourcepath.js)
				.pipe(concat('main.js'))
				.pipe(browserify())
				.pipe(minify())
				.pipe(gulp.dest(apppath.js))

});

gulp.task('compresscss',  function(){

	var bootstrapfiles=gulp.src('node_modules/bootstrap/dist/css/bootstrap.css');
	var sassfiles;
	sassfiles= gulp
			.src(sourcepath.sass)
			.pipe(autoprefixer())
			.pipe(sass({
				outputStyle:'expanded'
				})
				.on('error', sass.logError)
				)
			return merge(bootstrapfiles, sassfiles)
			.pipe(concat('main.css'))
			.pipe(cssmin())
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest(apppath.css))
});

/* production task ends--------------------*/

gulp.task('serve', ['sass'], function(){
	browserSync.init([apppath.css +'*.css', apppath.root + '*.html', apppath.js + '*.js'], {
		server:{
			baseDir:apppath.root
		}
	})

});


gulp.task('watch', ['serve', 'sass',  'scripts', 'movefonts', 'images', 'html'],  function(){
	gulp.watch(sourcepath.sass, ['sass']);
	//gulp.watch(sourcepath.html, ['copy']);
	gulp.watch(sourcepath.js, ['scripts']);
	gulp.watch(sourcepath.image, ['images']);
	gulp.watch([sourcepath.html, sourcepath.htmlpartial], ['html'])
})
gulp.task('default', ['watch']);