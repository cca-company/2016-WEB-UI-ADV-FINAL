var gulp = require('gulp');
var merge = require('gulp-merge');
var minify = require('gulp-minify');
var jscs = require('gulp-jscs');
var browserSync = require('browser-sync').create();
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('default',['browser-sync'], function() {

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('test', function () {
    return gulp
    .src('test/runner.html')
    .pipe(mochaPhantomJS({reporter: 'spec'}));
});