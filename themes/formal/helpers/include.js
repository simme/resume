/* jshint node: true, esnext: true */
'use strict';

module.exports = function(options) {
  var context = {},
    mergeContext = function(obj) {
      for(var k in obj)context[k]=obj[k];
    };
  mergeContext(this);
  mergeContext(options.hash);
  return options.fn(context);
};
