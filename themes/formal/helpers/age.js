/* jshint node: true, esnext: true */
'use strict';

const moment = require('moment');

module.exports = function (date) {
  return Math.abs(moment(date).diff(Date.now(), 'years')) + ' years';
};
