var Q = require('q');
var chalk = require('chalk');
var a11yLib = require('a11y');
var isBlank = require('is-blank');

module.exports = function a11y(options, scrutinyData, callback) {
  var deferred = Q.defer();
  scrutinyData = scrutinyData || {};

  a11yLib(options.url.normalizedUrl, function(err, reports) {
    scrutinyData.a11y = {};
    scrutinyData.a11y.failures = [];

    if (err || isBlank(reports)) {
      console.log('scrutinize a11y failed for: ' + options.url.humanizedUrl);
      console.log(err);
      deferred.resolve(err, scrutinyData);
      return;
    }

    reports.audit.forEach(function(el) {
      if (el.result === 'FAIL') {
        el.elements = el.elements.split('\n');
        scrutinyData.a11y.failures.push(el);
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
    chalk.bgBlue.underline.white('\n\nA11y\n')
  ];

  scrutinyData.a11y.failures.forEach(function(failure) {
    reportStringLines.push(
      chalk.red(failure.severity) + '\n' +
      chalk.underline(failure.heading) + '\n' +
      failure.elements.join('\n') + '\n'
    );
  });

  console.log(reportStringLines.join('\n'))
}
