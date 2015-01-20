var Q = require('q')
var getCss = require('get-css');
var cssStatistics = require('css-statistics');
var isVendorPrefixed = require('is-vendor-prefixed');
var chalk = require('chalk');

module.exports = function cssStats(options, scrutinyData, callback) {
  var deferred = Q.defer();
  scrutinyData = scrutinyData || {};

  getCss(options.url.normalizedUrl)
    .then(function(css) {
      var stats = cssStatistics(css.css);
      console.log(JSON.stringify(stats.declarations.all, undefined, 2));
      var aggregates = stats.aggregates;

      scrutinyData.css = {
        vendorPrefixes: 0,
        selectorCount: aggregates.selectors,
        mediaQueriesCount: aggregates.mediaQueries.length,
        colors: aggregates.colors.total,
        widths: aggregates.widths.total,
        fontSizes: aggregates.fontSizes.total,
        backgroundColors: aggregates.backgroundColors.total
      };

      stats.declarations.all.forEach(function(declaration) {
        if (declaration.type === 'declaration') {
          if (isVendorPrefixed(declaration.property)) {
            scrutinyData.css.vendorPrefixes++;
          }
        }
      });

      if (options.verbose) {
        generateReport(scrutinyData);
      }

      deferred.resolve(scrutinyData);
    });

  return deferred.promise;
}

function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgGreen.underline.white('\n\nCSS Stats\n'),
    chalk.green('Total Selectors') + ' ' + scrutinyData.css.selectorCount,
    chalk.green('Vendor Prefixes') + ' ' + scrutinyData.css.vendorPrefixes,
    chalk.green('Media Queries') + ' ' + scrutinyData.css.mediaQueriesCount,
    chalk.green('Background Colors') + ' ' + scrutinyData.css.backgroundColors,
    chalk.green('Colors') + ' ' + scrutinyData.css.colors,
    chalk.green('Widths') + ' ' + scrutinyData.css.widths,
    chalk.green('Font Sizes') + ' ' + scrutinyData.css.fontSizes
  ];

  console.log(reportStringLines.join('\n') + '\n');
}
