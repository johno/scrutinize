'use strict';

var a11y = require('./lib/a11y');
var cssStats = require('./lib/css-stats');
var pageSpeed = require('./lib/page-speed');

var humanizeUrl = require('humanize-url');
var normalizeUrl = require('normalize-url');

module.exports = function scrutinize(url, options, callback) {
  if (typeof url != 'string') {
    throw new TypeError('scrutinize expects a url');
  }

  options = options || {};
  options.verbose = options.verbose || false;
  options.url = { url: url };

  if (!options.key && process.env.GAPPS_API_KEY) {
    options.key = process.env.GAPPS_API_KEY;
  }

  callback = callback || function() {};

  options.url.normalizedUrl = normalizeUrl(url);
  options.url.humanizedUrl = humanizeUrl(url);

  pageSpeed(options.url, options, {})
    .then(function(data) {
      return a11y(options.url, data);
    })
    .then(function(data) {
      return cssStats(options.url, data);
    }).then(function(data) {
      callback(data);
    }).catch(function(error) {
      console.log(error);
    });
}
