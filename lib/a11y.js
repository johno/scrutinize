var Q = require('q');
var chalk = require('chalk');
var a11yLib = require('a11y');

module.exports = function a11y(options, scrutinyData, callback) {
  var deferred = Q.defer();

  a11yLib(options.url.normalizedUrl, function(err, reports) {
    scrutinyData.a11y = {};
    scrutinyData.a11y.failures = [];

    reports.audit.forEach(function(el) {
      if (el.result === 'FAIL') {
        scrutinyData.a11y.failures.push(el);
      }
    });

    generateReport(scrutinyData);
    deferred.resolve(scrutinyData);
  });

  return deferred.promise;
}

function generateReport(scrutinyData) {
  var reportStringLines = [
    chalk.bgBlue.underline.white('\n\nA11y\n')
  ]

  scrutinyData.a11y.failures.forEach(function(failure) {
    reportStringLines.push(
      chalk.red(failure.severity) + '\n' +
      chalk.underline(failure.heading) + '\n' +
      failure.elements + '\n'
    );
  });

  console.log(reportStringLines.join('\n'))
}
