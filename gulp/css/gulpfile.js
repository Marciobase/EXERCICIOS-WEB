const gulp = require('gulp')
const { series, parallel } = require('gulp')
// const sass = require('gulp-sass')
const sass = require('gulp-sass')(require('sass'))
const uglifyCss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function padrao() {
    return gulp.src('src/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(concat('estilo.min.css'))
        .pipe(gulp.dest('build/css'))
}

const copiar = () => {
    return gulp.src('src/**/*.html')
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(gulp.dest('build'))
}

exports.default = parallel(
    copiar,
    padrao
)