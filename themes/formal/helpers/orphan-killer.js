/* jshint node: true, esnext: true */
'use strict';

const Handlebars = require('handlebars');

module.exports = function (text) {
  const regex = /\s([\S]+)$/;
  return new Handlebars.SafeString(text.replace(regex, '&nbsp;$1'));
};
