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
