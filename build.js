/* jshint node: true, esnext: true */
'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const handlebars = require('handlebars');
const Theme = require('./theme');

const target = path.resolve(__dirname, process.argv[2] || 'resume.yaml');
const data = fs.readFileSync(target, 'utf-8');
var resume = yaml.safeLoad(data);

const t = new Theme('formal');
t.load(function (err) {
  t.render(resume, write);
});

function write(output) {
  fs.writeFileSync(path.join(__dirname, 'output.html'), output);
}

//
//
//const themeFile = path.resolve(__dirname, 'themes', process.argv[3] || 'formal') + '/template.hbs';
//const themeData = fs.readFileSync(themeFile, 'utf-8');
//const theme = handlebars.compile(themeData);
//const themeTransformer = require('./themes/formal/transformer');
//
//resume = themeTransformer(resume);
//
//const output = theme(resume);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
