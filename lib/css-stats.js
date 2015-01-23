var Q = require('q')
var getCss = require('get-css');
var cssStatistics = require('cssstats');
var hasPseudoClass = require('has-pseudo-class');
var hasPseudoElement = require('has-pseudo-element');
var isVendorPrefixed = require('is-vendor-prefixed');
var isBlank = require('is-blank');
var chalk = require('chalk');

module.exports = function cssStats(options, scrutinyData, callback) {
  var deferred = Q.defer();
  scrutinyData = scrutinyData || {};

  getCss(options.url.normalizedUrl, options)
    .then(function(css) {
      try {
        var stats = cssStatistics(css.css);
      } catch(err) {
        console.log('scrutinize get-css failed for: ' + options.url.humanizedUrl);
        console.log(err);
        deferred.resolve(scrutinyData);
        return;
      }

      var aggregates = stats.aggregates;

      scrutinyData.css = {
        vendorPrefixes: 0,
        pseudoElements: 0,
        pseudoClasses: 0,
        longestSelector: '',
        mostSpecificSelector: {},
        selectorCount: aggregates.selectors,
        declarationCount: aggregates.declarations,
        mediaQueriesCount: aggregates.mediaQueries.length,
        colors: aggregates.color.total,
        widths: aggregates.width.total,
        fontSizes: aggregates.fontSize.total,
        backgroundColors: aggregates.backgroundColor.total,
        stats: stats
      };

      stats.declarations.all.forEach(function(declaration) {
        if (declaration.type === 'declaration') {
          if (isVendorPrefixed(declaration.property)) {
            scrutinyData.css.vendorPrefixes++;
          }
        }
      });

      stats.selectors.forEach(function(selector) {
        if (hasPseudoClass(selector.selector)) {
          scrutinyData.css.pseudoClasses++;
        }

        if (hasPseudoElement(selector.selector)) {
          scrutinyData.css.pseudoElements++;
        }

        if (selector.selector.length > scrutinyData.css.longestSelector.length) {
          scrutinyData.css.longestSelector = selector.selector;
        }

        if (isBlank(scrutinyData.css.mostSpecificSelector) || scrutinyData.css.mostSpecificSelector.specificity_10 < selector.specificity_10) {
          scrutinyData.css.mostSpecificSelector = selector;
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
    chalk.green('Pseudo Elements') + ' ' + scrutinyData.css.pseudoElements,
    chalk.green('Pseudo Classes') + ' ' + scrutinyData.css.pseudoClasses,
    chalk.green('Longest Selector') + ' ' + scrutinyData.css.longestSelector,
    chalk.green('Most Specific Selector') + ' ' + scrutinyData.css.mostSpecificSelector.selector,
    chalk.green('Media Queries') + ' ' + scrutinyData.css.mediaQueriesCount,
    chalk.green('Background Colors') + ' ' + scrutinyData.css.backgroundColors,
    chalk.green('Colors') + ' ' + scrutinyData.css.colors,
    chalk.green('Widths') + ' ' + scrutinyData.css.widths,
    chalk.green('Font Sizes') + ' ' + scrutinyData.css.fontSizes
  ];

  console.log(reportStringLines.join('\n') + '\n');
}
