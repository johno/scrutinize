'use strict';

var psi = require('psi');
var getCss = require('get-css');
var Table = require('cli-table');
var cssStats = require('css-statistics');
var humanizeUrl = require('humanize-url');
var normalizeUrl = require('normalize-url');

module.exports = function scrutinize(url, options, callback) {
  if (typeof url != 'string') {
    throw new TypeError('scrutinize expects a url');
  }

  options = options || {};
  options.verbose = options.verbose || false;
  options.key = options.key || process.env.GAPPS_API_KEY;
  options.url = url;

  callback = callback || function() {};

  var scrutinyData = {};

  var normalizedUrl = normalizeUrl(url);
  var humanizedUrl = humanizeUrl(url);

  psi(url, options, function(err, data) {
    var table = new Table({
      head: [humanizedUrl, data.title],
      colWidths: [40, 120]
    });

    var ruleResults = data.formattedResults.ruleResults;
    var pageStats = data.pageStats;

    scrutinyData.psi = {};
    scrutinyData.psi.score = data.score;
    scrutinyData.psi.numberResources = pageStats.numberResources;
    scrutinyData.psi.numberHosts = pageStats.numberHosts;
    scrutinyData.psi.ruleResults = [];

    table.push(
      { 'Page Speed Score': data.score },
      { Requests: pageStats.numberResources + ' files from ' + pageStats.numberHosts + ' hosts' }
    );

    Object.keys(ruleResults).forEach(function(key) {
      var resultObject = ruleResults[key];
      var tableRow = {};
      var headers = [];

      resultObject.urlBlocks.forEach(function(urlBlock) {
        var formattedString = formatString(urlBlock.header.format, urlBlock.header.args);
        scrutinyData.psi.ruleResults.push(formattedString);
        headers.push(formattedString);
      });

      tableRow[resultObject.localizedRuleName] = headers.join('\n');

      if (resultObject.ruleImpact > 0) {
        table.push(tableRow);
      }
    });

    if (options.verbose) {
      console.log('Page Speed Insights')
      console.log(table.toString());
    }

    callback(err, scrutinyData);
  });
}

function formatString(stringToFormat, headerArgs) {
  if (!headerArgs || headerArgs.length == 0) {
    return stringToFormat;
  }

  return stringToFormat.replace(/(\$[\d+])/g, function(match) {
    // Chop off the '$', account for 0-indexed array
    var argIndex = Number(match.split(/\$/)[1]) - 1;

    return typeof headerArgs[argIndex] != 'undefined' ? headerArgs[argIndex].value : match;
  });
}
