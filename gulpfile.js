var gulp = require('gulp');
var merge = require('gulp-merge');
var minify = require('gulp-minify');
var jscs = require('gulp-jscs');
var browserSync = require('browser-sync').create();

gulp.task('default',['browser-sync'], function() {

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});