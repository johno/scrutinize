'use strict';

var a11y = require('./lib/a11y');
var cssStats = require('./lib/css-stats');
var pageSpeed = require('./lib/page-speed');
var buildUrlObj = require('./lib/build-url-obj');

module.exports = function scrutinize(url, options, callback) {
  if (typeof url != 'string') {
    throw new TypeError('scrutinize expects a url');
  }

  options = options || {};
  options.verbose = options.verbose || false;
  options.url = buildUrlObj(url);

  if (!options.key && process.env.GAPPS_API_KEY) {
    options.key = process.env.GAPPS_API_KEY;
  }

  callback = callback || function() {};

  pageSpeed(options, {})
    .then(function(data) {
      return a11y(options, data);
    })
    .then(function(data) {
      return cssStats(options, data);
    }).then(function(data) {
      callback(data);
    }).catch(function(error) {
      console.log(error);
    });
}
