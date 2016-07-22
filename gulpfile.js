// Dependencies
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author%>',
  ' * Licensed under the <%= pkg.license %> license',
  ' */',
  ''].join('\n');

// Default
gulp.task('default', ['watch']);

// Concat & Minify JS files
gulp.task('JS', function () {
    var files = ['bootstrap-popup.js'];

    return gulp.src(files)
        .pipe(strip())
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('dist'))
        .pipe(rename('bootstrap-popup.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(header(banner, {
            pkg: package
        }))
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['JS'], function () {
    var files = [''];
    gulp.watch(files, ['JS']);
});
