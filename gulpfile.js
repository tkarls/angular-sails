'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    ngAnnotate = require('gulp-ng-annotate'),
    pkg = require('./package.json'),
    files = require('./files');

gulp.task('build-js', function () {
    return gulp.src(files.mergeFilesFor('src'))
        .pipe(ngAnnotate())
        .pipe(concat(pkg.name+'.js'))
        .pipe(header('(function (angular, io) {\n\'use strict\''))
        .pipe(footer('}(angular, io));'))
        .pipe(gulp.dest('./build/'))
        .pipe(concat(pkg.name+'.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('dist-js', ['build-js'], function () {
    return gulp.src('./build/*.js')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    return gulp.watch('src/**/*.js', ['build-js']);
});

gulp.task('default', ['build-js', 'watch']);
