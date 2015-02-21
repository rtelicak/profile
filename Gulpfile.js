var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require("browser-sync");
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var vendorJsFiles = [
	'assets/vendor/js/jquery.min.js',
	'assets/vendor/js/jquery-migrate.min.js',
	'assets/vendor/js/slick.js',
];

var targetJSDir = 'assets/js';

// Compile Sass, autoprefix CSS3,
// and save to target CSS directory
gulp.task('css', function () {
	return gulp.src('assets/sass/main.sass')
		  .pipe(sourcemaps.init())
		  .pipe(sass({indentedSyntax: true, errLogToConsole: true}))
		  .pipe(sourcemaps.write())
		  .pipe(gulp.dest('assets/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'http://localhost:8888/profile/'
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
	browserSync.reload();
});

// Dev
gulp.task('default',['browser-sync', 'css'] ,function () {
	gulp.watch(['assets/**/*.sass', 'assets/**/*.scss', '*.html'], ['css', 'bs-reload']);
});


// Build tasks
gulp.task('cssBuild', function () {
	return gulp.src('assets/sass/main.sass')
		  .pipe(sass({indentedSyntax: true, errLogToConsole: true}))
		  .pipe(minifyCSS())
		  .pipe(autoprefix('last 20 version'))
		  .pipe(gulp.dest('assets/css'))
});

gulp.task('jsBuild', function() {
  return gulp.src(vendorJsFiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(targetJSDir));
});

gulp.task('build', ['cssBuild', 'jsBuild']);











