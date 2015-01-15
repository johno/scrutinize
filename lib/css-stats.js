var getCss = require('get-css');
var cssStatistics = require('css-statistics');
var Table = require('cli-table');

module.exports = function cssStats(url, scrutinyData, callback) {
  getCss(url.normalizedUrl).then(function(css) {
    var stats = cssStatistics(css.css).aggregates;

    scrutinyData.css = {};
    scrutinyData.css.selectorCount = stats.selectors;
    scrutinyData.css.mediaQueriesCount = stats.mediaQueries.length;
    scrutinyData.css.colors = stats.colors.total;
    scrutinyData.css.widths = stats.widths.total;
    scrutinyData.css.fontSizes = stats.fontSizes.total;
    scrutinyData.css.backgroundColors = stats.backgroundColors.total;

    var table = new Table({
      head: [url.humanizedUrl, data.title],
      colWidths: [40, 120]
    });

    table.push(
      { 'Total Selectors': scrutinyData.css.selectorCount },
      { 'Media Queries': scrutinyData.css.mediaQueriesCount },
      { 'Colors': scrutinyData.css.colors },
      { 'Widths': scrutinyData.css.widths },
      { 'Font Sizes': scrutinyData.css.fontSizes },
      { 'Background Colors': scrutinyData.css.backgroundColors }
    );

    console.log('CSS Stats');
    console.log(table.toString());
    callback(scrutinyData);
  });
}
