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
  options.key = options.key || process.env.GAPPS_API_KEY;
  options.url = { url: url };

  callback = callback || function() {};

  var scrutinyData = {};

  options.url.normalizedUrl = normalizeUrl(url);
  options.url.humanizedUrl = humanizeUrl(url);

  pageSpeed(options.url, options, scrutinyData, function(err, data) {
    a11y(options.url, scrutinyData, function(err, data) {
      cssStats(options.url, scrutinyData, function(data) {
        console.log('yoooo');
        callback(err, data);
      });
    });
  });
}
