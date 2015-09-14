/* jshint node: true, esnext: true */
'use strict';

const Handlebars = require('handlebars');

module.exports = function (from, to, current, context) {
  from = Handlebars.Utils.escapeExpression(from).replace('-', '.');
  to = Handlebars.Utils.escapeExpression(to).replace('-', '.');
  if (to === 'present') {
    to = '<em>' + current + '</em>';
  }

  return new Handlebars.SafeString(from + ' &mdash; ' + to);
};
