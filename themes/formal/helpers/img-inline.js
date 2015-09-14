/* jshint node: true, esnext: true */
'use strict';

const base64Img = require('base64-img');

module.exports = function (path) {
  console.log(path);
  return base64Img.base64Sync(path);
};
