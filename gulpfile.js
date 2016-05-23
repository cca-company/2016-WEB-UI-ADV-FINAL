var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var jscs = require('gulp-jscs');

gulp.task('default',['concat-js','concat-css'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on('change',browserSync.reload);
    gulp.watch("js/*.js", ['concat-js']).on('change',browserSync.reload);
    gulp.watch("css/*.css", ['concat-css']).on('change',browserSync.reload);
});

gulp.task('concat-js', function() {
    return gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-css', function() {
    return gulp.src('./css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/'));
});
