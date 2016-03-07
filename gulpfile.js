// Dependencies
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

// Default
gulp.task('default', ['watch']);

// Concat & Minify JS files
gulp.task('JS', function () {
    var files = ['bootstrap-popup.js'];

    return gulp.src(files)
        .pipe(rename('bootstrap-popup.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['less', 'JS'], function () {
    var files = [''];
    gulp.watch(files, ['JS']);
});
