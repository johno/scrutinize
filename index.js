'use strict';

var a11y = require('./lib/a11y');
var cssStats = require('./lib/css-stats');
var pageSpeed = require('./lib/page-speed');
var buildUrlObj = require('./lib/build-url-obj');
var domStats = require('./lib/dom-stats');
var chalk = require('chalk');

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

  pageSpeed(options, { url: url })
    .then(function(data) {
      return a11y(options, data);
    })
    .then(function(data) {
      return cssStats(options, data);
    }).then(function(data) {
      return domStats(options, data);
    })
    .then(function(data) {
      if (options.verbose) {
        generateReport(data);
      }

      callback(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}


function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgWhite.black('\n\n' + scrutinyData.title + ' - ' + scrutinyData.url + '\n'),
    chalk.underline('Page Speed Score') + ' ' + scrutinyData.score,
    chalk.underline('Resources/Hosts') + ' ' + scrutinyData.psi.numberResources + '/' + scrutinyData.psi.numberHosts,
    chalk.underline('Total Request Size') + ' ' + scrutinyData.totalRequestSizePretty,
    chalk.underline('Total Page Size') + ' ' + scrutinyData.totalPageSizePretty,
    chalk.underline('HTML Size') + ' ' + scrutinyData.htmlSizePretty,
    chalk.underline('Total HTML Elements') + ' ' + scrutinyData.domStats.totalTags,
    chalk.underline('CSS Size') + ' ' + scrutinyData.cssSizePretty,
    chalk.underline('JS Size') + ' ' + scrutinyData.jsSizePretty,
    chalk.underline('IMG Size') + ' ' + scrutinyData.imageSizePretty,
  ];

  console.log(reportStringLines.join('\n'))
}
