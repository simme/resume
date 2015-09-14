/* jshint node: true, esnext: true */
'use strict';

const markdown = require('node-markdown').Markdown;
const Handlebars = require('handlebars');

module.exports = function (text) {
  return new Handlebars.SafeString(markdown(text));
};
