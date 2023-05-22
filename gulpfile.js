const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const customWatchMessage = { 
    message: "Watching for changes youth",
    title: "GUZLAAAA"
}

const customJSChangesMessage = { 
    message: "Updating JS changes",
    title: "GUZZLIN IT!"
}

const customSCSSChangesMessage = { 
    message: "Updating CSS changes",
    title: "GUZZLIN IT!"
}

//style paths
var sassFiles = 'sass/**/*.scss',
    cssDest = '';

//script paths
var jsFiles = 'js/scripts/**/*.js',
    jsDest = 'js/';

gulp.task('styles', function(){
    notify(customSCSSChangesMessage).write('');
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(concat('main.css'))
        .pipe(minify())
        .pipe(gulp.dest(cssDest));
});

gulp.task('scripts', function() {
    notify(customJSChangesMessage).write('');
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('watch',function() {
    notify(customWatchMessage).write('');
    gulp.watch(sassFiles,gulp.series('styles'));
    gulp.watch(jsFiles, gulp.series('scripts'));
});

gulp.task('default', gulp.series('watch') );

