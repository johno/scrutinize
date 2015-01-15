var Q = require('q')
var getCss = require('get-css');
var cssStatistics = require('css-statistics');
var chalk = require('chalk');

module.exports = function cssStats(url, scrutinyData, callback) {
  var deferred = Q.defer();

  getCss(url.normalizedUrl)
    .then(function(css) {
      var stats = cssStatistics(css.css).aggregates;

      scrutinyData.css = {};
      scrutinyData.css.selectorCount = stats.selectors;
      scrutinyData.css.mediaQueriesCount = stats.mediaQueries.length;
      scrutinyData.css.colors = stats.colors.total;
      scrutinyData.css.widths = stats.widths.total;
      scrutinyData.css.fontSizes = stats.fontSizes.total;
      scrutinyData.css.backgroundColors = stats.backgroundColors.total;

      generateReport(scrutinyData);
      deferred.resolve(scrutinyData);
    });

  return deferred.promise;
}

function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgGreen.underline.white('\n\nCSS Stats\n'),
    chalk.green('Total Selectors') + ' ' + scrutinyData.css.selectorCount,
    chalk.green('Media Queries') + ' ' + scrutinyData.css.mediaQueriesCount,
    chalk.green('Background Colors') + ' ' + scrutinyData.css.backgroundColors,
    chalk.green('Colors') + ' ' + scrutinyData.css.colors,
    chalk.green('Widths') + ' ' + scrutinyData.css.widths,
    chalk.green('Font Sizes') + ' ' + scrutinyData.css.fontSizes
  ];

  console.log(reportStringLines.join('\n'));
}
