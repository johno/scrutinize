'use strict';

var Q = require('q');
var chalk = require('chalk');
var domStatsLib = require('dom-stats');

module.exports = function domStats(options, scrutinyData) {
  scrutinyData = scrutinyData || {};
  var deferred = Q.defer();

  domStatsLib(options.url.normalizedUrl, {}, function(err, domStats) {
    if (err) {
      console.log('scrutinize dom-stats encountered an error: ' + err);
      deferred.resolve(err, scrutinyData);
      return;
    }

    scrutinyData.domStats = domStats;

    if (options.verbose) {
      generateReport(scrutinyData);
    }

    deferred.resolve(scrutinyData);
  });

  return deferred.promise;
}


function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgMagenta.underline.white('\n\nDOM Stats\n'),
    chalk.magenta('Total Elements') + ' ' + scrutinyData.domStats.totalTags,
    chalk.magenta('Total Ids') + ' ' + scrutinyData.domStats.totalIds,
    chalk.magenta('Duplicate Ids') + ' ' + scrutinyData.domStats.duplicateIdsCount + (scrutinyData.duplicateIds || ''),
    chalk.magenta('Total Classes') + ' ' + scrutinyData.domStats.totalClasses,
    chalk.magenta('Average Classes per Element') + ' ' + scrutinyData.domStats.averageClassCount
  ];

  console.log(reportStringLines.join('\n') + '\n');
}
