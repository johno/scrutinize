'use strict';

var Q = require('q');
var domStatsLib = require('dom-stats');

module.exports = function domStats(options, scrutinyData) {
  var deferred = Q.defer();

  domStatsLib(options.url.normalizedUrl, {}, function(err, domStats) {
    if (err) {
      console.log('scrutinize dom-stats encountered an error: ' + err);
    }

    scrutinyData.domStats = domStats;
    deferred.resolve(scrutinyData);
  });

  return deferred.promise;
}
