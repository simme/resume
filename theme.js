/* jshint node: true, esnext: true */
'use strict';

const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');
const async = require('async');

// Load a theme and prepare it

var Theme = function (name, themesPath) {
  this.name = name;
  this.path = themesPath || path.join(__dirname, 'themes');
  this.template = null;
  this.transformer = null;
};

Theme.prototype.render = function (data, fn) {
  const theme = this;
  if (this.transformer) {
    this.transformer(data, transformed);
  }
  else {
    transformed(null, data);
  }

  function transformed(err, data) {
    const output = theme.template(data);
    fn(err, output);
  }
};

Theme.prototype.load = function (callback) {
  const themePath = path.join(this.path, this.name);

  async.series([
      this.loadPartials.bind(this, themePath),
      this.loadHelpers.bind(this, themePath),
      this.loadTemplate.bind(this, themePath),
      this.loadTransformer.bind(this, themePath),
  ], callback);
};

Theme.prototype.loadPartials = function (themePath, callback) {
  const partialsPath = path.join(themePath, 'partials');
  fs.stat(partialsPath, function (err, stat) {
    if (err || !stat.isDirectory()) {
      console.log('Not loading partials. Error or no directory.', err);
      return callback();
    }

    fs.readdir(partialsPath, function (err, files) {
      if (err) {
        return callback(err);
      }

      files = files.filter(function (name) {
        return name.indexOf('.hbs') > 1;
      });

      function loadPartial(partial) {
        if (!partial) {
          return callback();
        }

        const partialPath = path.join(partialsPath, partial);
        fs.readFile(partialPath, { encoding: 'utf-8' }, function (err, file) {
          const name = path.basename(partialPath, '.hbs');
          Handlebars.registerPartial(name, file);
          loadPartial(files.pop());
        });
      }

      loadPartial(files.pop());
    });
  });
};

Theme.prototype.loadHelpers = function (themePath, callback) {
  const helpersPath = path.join(themePath, 'helpers');
  fs.stat(helpersPath, function (err, stat) {
    if (err || !stat.isDirectory()) {
      console.log('Not loading helpers. Error or no directory.', err);
      return callback();
    }

    fs.readdir(helpersPath, function (err, files) {
      if (err) {
        return callback(err);
      }

      files.filter(function (name) {
        return name.indexOf('.js') > 1;
      }).forEach(function (helper) {
        const helperName = path.basename(helper, '.js');
        const helperPath = path.join(helpersPath, helper);
        Handlebars.registerHelper(helperName, require(helperPath));
      });

      callback();
    });
  });
};

Theme.prototype.loadTemplate = function (themePath, callback) {
  const theme = this;
  const templatePath = path.join(themePath, 'template.hbs');
  fs.readFile(templatePath, { encoding: 'utf-8' }, function (err, data) {
    if (err) {
      return callback(err);
    }

    theme.template = Handlebars.compile(data);

    callback();
  });
};

Theme.prototype.loadTransformer = function (themePath, callback) {
  const transformerPath = path.join(themePath, 'transformer.js');
  try {
    this.transformer = require(transformerPath);
  } catch (err) { console.log(err); }
  callback();
};

module.exports = Theme;
