/* jshint node: true, esnext: true */
'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const Theme = require('./theme');

const through = require('through2');
const Gulp = require('gulp');
const Watch = require('gulp-watch');

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
    .pipe(Gulp.dest('build/'));
});

Gulp.task('watch', function () {
  Gulp.watch('./*.yaml', ['render']);
  Gulp.watch('./themes/**/*.hbs', ['render']);
});
