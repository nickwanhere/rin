var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var runSequence = require('run-sequence');

// sass

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({errLogToConsole: true})) // コンパイルエラーが起きてもgulpを止めない
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});


gulp.task('sass_dev', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({errLogToConsole: true})) // コンパイルエラーが起きてもgulpを止めない
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 2 versions']
            }
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});

// js-concat-uglify

gulp.task('js_dev', function() {
    gulp.src(['js/*.js'])
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});


// js-concat-uglify

gulp.task('js', function() {
    gulp.src(['js/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify({preserveComments: 'some'})) // 一部コメントは残す
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

// imagemin

gulp.task('imagemin', function() {
    gulp.src(['images/**/*.{png,jpg,gif}'])
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest('build/images'));
});

// Static server

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('deploy',function(){

  runSequence('sass',
              'js', 'imagemin'
              );
});


// gulp コマンドでなにやるか指定

gulp.task('default',['browser-sync'], function() {
    gulp.watch('sass/**/*.scss',['sass_dev']);
    gulp.watch('js/*.js',['js_dev']);
    gulp.watch("*.html", ['bs-reload']);
});