var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var install = require('gulp-install');
var livereload = require('gulp-livereload');

var angularPath = './dashboard-angular';
var assetsPath = angularPath.concat('/assets');
var angularModulePath = angularPath.concat('/js/module.js');
var angularJsPath = angularPath.concat('/js/**/*.js');
var angularStylusPath = angularPath.concat('/stylus/**/*.styl');
var angularIndexPath = angularPath.concat('/index.html');
var excludeAngularBowerComponents = '!'.concat(angularJsPath).concat('bower_components/**');

var nodePath = './server-node';
var nodeScriptPath = nodePath.concat('/office-analysis-server-node.js');
var excludeServerNodeModules = '!'.concat(nodePath).concat('node_modules/**');

gulp.task('dependencies', function () {
    gulp.src([angularPath.concat('/bower.json'), nodePath.concat('/package.json')])
        .pipe(install());
});

gulp.task('concatJs', function () {
    gulp.src(angularJsPath)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(assetsPath))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    gulp.src(angularStylusPath)
        .pipe(concat('style.css'))
        .pipe(stylus())
        .pipe(gulp.dest(assetsPath))
        .pipe(livereload());
});

gulp.task('hint', function () {
    gulp.src([nodePath, excludeServerNodeModules, angularJsPath, excludeAngularBowerComponents])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch:angular', function () {
    gulp.watch([angularModulePath, angularJsPath], ['hint', 'concatJs'], function (file) {
        console.log('reloading because of change in: ' + file.path);
    });

    gulp.watch(angularStylusPath, ['stylus'], function (file) {
        console.log('reloading because of change in: ' + file.path);
    });

    gulp.watch([angularIndexPath], function (file) {
        gulp.src(file.path)
            .pipe(livereload());
        console.log('reloading because of change in: ' + file.path);
    });
});

gulp.task('dev:angular', ['watch:angular']);

gulp.task('dev:node', function () {
    nodemon({
        script: nodeScriptPath,
        ext: 'js',
        ignore: ['dashboard-angular*', 'gulp*', 'assets*']
    });
});

gulp.task('dev', ['hint', 'dependencies', 'dev:angular', 'dev:node'], function () {
    livereload.listen();
});
Status API Training Shop Blog About
© 2015 GitHub, Inc. Terms Privacy Security Contact