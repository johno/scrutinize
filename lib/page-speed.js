var Q = require('q');
var chalk = require('chalk');
var prettyBytes = require('pretty-bytes');
var isPresent = require('is-present');
var psi = require('psi');

module.exports = function pageSpeed(options, scrutinyData) {
  var deferred = Q.defer();
  scrutinyData = scrutinyData || {};

  psi(options.url.normalizedUrl, options, function(err, data) {
    if (err) {
      console.log(err);
    }

    var ruleResults = data.formattedResults.ruleResults;
    var pageStats = data.pageStats;

    scrutinyData.title = data.title;
    scrutinyData.score = data.score;
    scrutinyData.responseCode = data.responseCode;
    scrutinyData.totalRequestSize = Number(pageStats.totalRequestBytes || 0);
    scrutinyData.htmlSize = Number(pageStats.htmlResponseBytes || 0);
    scrutinyData.cssSize = Number(pageStats.cssResponseBytes || 0);
    scrutinyData.imageSize = Number(pageStats.imageResponseBytes || 0);
    scrutinyData.jsSize = Number(pageStats.javascriptResponseBytes || 0);
    scrutinyData.totalPageSize = scrutinyData.jsSize + scrutinyData.imageSize + scrutinyData.cssSize + scrutinyData.htmlSize;

    scrutinyData.totalRequestSizePretty = prettyBytes(scrutinyData.totalRequestSize);
    scrutinyData.htmlSizePretty = prettyBytes(scrutinyData.htmlSize);
    scrutinyData.cssSizePretty = prettyBytes(scrutinyData.cssSize);
    scrutinyData.imageSizePretty = prettyBytes(scrutinyData.imageSize);
    scrutinyData.jsSizePretty = prettyBytes(scrutinyData.jsSize);
    scrutinyData.totalPageSizePretty = prettyBytes(scrutinyData.totalPageSize);

    scrutinyData.psi = {};
    scrutinyData.psi.numberResources = pageStats.numberResources;
    scrutinyData.psi.numberHosts = pageStats.numberHosts;
    scrutinyData.psi.ruleResults = [];

    Object.keys(ruleResults).forEach(function(key) {
      var resultObject = ruleResults[key];
      var rules = [];

      if (resultObject.ruleImpact === 0) {
        return;
      }

      resultObject.urlBlocks.forEach(function(urlBlock) {
        var rule = {}
        rule.header = formatString(urlBlock.header.format, urlBlock.header.args || []);
        rule.results = [];

        if (urlBlock.urls && urlBlock.urls.length) {
          urlBlock.urls.forEach(function(url) {
            rule.results.push(formatString(url.result.format, url.result.args));
          });
        }

        rules.push(rule);
      });

      scrutinyData.psi.ruleResults.push({
        name: resultObject.localizedRuleName,
        results: rules
      });
    });

    if (options.verbose) {
      generateReport(scrutinyData);
    }

    deferred.resolve(scrutinyData);
  });

  return deferred.promise;
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

function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgYellow.underline.black('\n\nPage Speed\n'),
    scrutinyData.psi.numberResources + ' files from ' + scrutinyData.psi.numberHosts + ' hosts\n'
  ];

  scrutinyData.psi.ruleResults.forEach(function(result) {
    var resultsString = result.results.map(function(res) {
      if (res.results.length) {
        return '\n' + chalk.underline(res.header) +
               '\n\n' + res.results.join('\n');
      } else {
        return res.header;
      }
    }).join('');

    reportStringLines.push(
      chalk.yellow(result.name) + '\n' +
      resultsString + '\n'
    )
  });

  console.log(reportStringLines.join('\n'));
}
