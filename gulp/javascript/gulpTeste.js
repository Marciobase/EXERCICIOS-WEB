const gulp = require('gulp')
const { series } = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify') 
const babel = require('gulp-babel')

const padrao  = cb => {
    gulp.src('src/**/*.js')
        .pipe(babel({
            comments: false,
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build'))
        
    return cb()
}

exports.default = series(padrao)