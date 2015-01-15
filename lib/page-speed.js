var Table = require('cli-table');
var psi = require('psi');

module.exports = function pageSpeed(url, options, scrutinyData, callback) {
  psi(url.normalizedUrl, options, function(err, data) {
    if (err) {
      console.log(err);
    }

    var table = new Table({
      head: [url.humanizedUrl, data.title],
      colWidths: [40, 120]
    });

    var ruleResults = data.formattedResults.ruleResults;
    var pageStats = data.pageStats;

    scrutinyData.title = data.title;

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
      var urls = [];

      resultObject.urlBlocks.forEach(function(urlBlock) {
        urls = [];

        (urlBlock.urls || []).forEach(function(url) {
          (url.result.args || []).forEach(function(urlArg) {
            if (urlArg.type === 'URL') {
              urls.push(urlArg.value);
            }
          });
        });
        var formattedString = formatString(urlBlock.header.format, urlBlock.header.args);

        if (urls.length) {
          formattedString = formattedString + '\n\n' + urls.join('\n');
        }

        scrutinyData.psi.ruleResults.push(formattedString);
        headers.push(formattedString);
      });

      tableRow[resultObject.localizedRuleName] = headers.join('\n');

      if (resultObject.ruleImpact > 0) {
        table.push(tableRow);
      }
    });

    console.log('Page Speed Insights')
    console.log(table.toString());
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
