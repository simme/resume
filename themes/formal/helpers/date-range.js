/* jshint node: true, esnext: true */
'use strict';

var Handlebars = require('handlebars');

module.exports = function (from, to, context) {
  from = Handlebars.Utils.escapeExpression(from).replace('-', '.');
  to = Handlebars.Utils.escapeExpression(to).replace('-', '.');
  if (to === 'present') {
    to = '<em>pågående</em>';
  }

  return new Handlebars.SafeString(from + ' &mdash; ' + to);
};
