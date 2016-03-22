/* jshint node: true, esnext: true */
'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const Theme = require('./theme');

const through = require('through2');
const Gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imageop = require('gulp-image-optimization');
const critical = require('critical').stream;
const minifyHTML = require('gulp-minify-html');
const sequence = require('run-sequence');
const clean = require('gulp-clean');

function render(theme, tpath) {
  var t = new Theme(theme, tpath);
  return through.obj(function (file, enc, callback) {
    const stream = this;
    const resume = yaml.safeLoad(file.contents);
    t.load(function (err) {
      //if (err) { throw err; }
      t.render(resume, function (err, output) {
        if (err) { throw err; }
        file.contents = new Buffer(output);
        file.path = path.join(path.dirname(file.path), path.basename(file.path, '.yaml') + '.html');
        stream.push(file);
        return callback();
      });
    });
  });
}

Gulp.task('render', function() {
  Gulp.src('./*.yaml')
    .pipe(render('formal'))
    .pipe(Gulp.dest('./build/'));
});

Gulp.task('css', function () {
  Gulp.src('./themes/**/master.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(Gulp.dest('./build/'));
});

Gulp.task('watch', function () {
  Gulp.watch('./*.yaml', ['render']);
  Gulp.watch('./themes/**/*.hbs', ['render']);
  Gulp.watch('./themes/**/*.scss', ['css']);
});

Gulp.task('images', function () {
  Gulp.src('./themes/**/*.jpg')
    .pipe(imageop())
    .pipe(Gulp.dest('./build/'));
});

Gulp.task('critical', function () {
  return Gulp.src('build/*.html')
    .pipe(critical({
      base: 'build/',
      inline: true,
      css: ['build/formal/master.css'],
      width: 1300,
      height: 900,
    }))
    .pipe(Gulp.dest('build'));
});

Gulp.task('minifyHTML', function () {
  return Gulp.src('./build/*.html')
    .pipe(minifyHTML())
    .pipe(Gulp.dest('./build/'));
});

Gulp.task('clean', function () {
  return Gulp.src('./build', {read: false})
    .pipe(clean());
});

Gulp.task('build', function (fn) {
  sequence('images', 'render', 'css', 'critical', 'minifyHTML', fn);
});

Gulp.task('default', function(fn) {
  sequence('clean', 'images', 'render', 'css', 'critical', 'minifyHTML', fn);
});
