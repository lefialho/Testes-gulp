'use strict';

// add modules

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPreFixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const fs = require('fs');


//functions and tasks

function sassCompilation(compressed) {
    return gulp.src('css/scss/**/*.scss')
        .pipe(sass({
            outputStyle: compressed
        }))
        .pipe(autoPreFixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
}

gulp.task('sass', function (done) {
    sassCompilation('compressed');
    done();
});


function gulpJs() {
    return gulp.src('js/main/**/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJs)


function pluginJS() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/moment/min/moment.min.js',
            'js/plugins/**/*.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())
}

gulp.task('pluginsjs', pluginJS)


function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

gulp.task('browser-sync', browser);


function images() {
    let catchImages = fs.readdirSync('./normal-img/')
    catchImages.forEach(function(img) {
        jimp.read('normal-img/imagem1.jpg').then(function(imagem) {
            imagem
            .cover(400, 400)
            .grayscale()
            .write('imagem-bw.jpg');
        }).catch(function(err) {
            console.error(err);
        })
    });
}

gulp.task('jimp', images)


function watch() {
    gulp.watch('css/scss/**/*.scss', sassCompilation);
    gulp.watch('js/main/**/*.js', gulpJs);
    gulp.watch('js/plugins/**/*.js', pluginJS);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

gulp.task('watch', watch)


// task default

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginsjs'));