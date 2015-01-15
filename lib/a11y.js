var a11yLib = require('a11y');
var Table = require('cli-table');

module.exports = function a11y(urlObj, scrutinyData, callback) {
  a11yLib(urlObj.url, function(err, reports) {
    scrutinyData.a11y = {};
    scrutinyData.a11y.failures = [];

    reports.audit.forEach(function(el) {
      if (el.result === 'FAIL') {
        scrutinyData.a11y.failures.push(el);
      }
    });

    var table = new Table({
      head: [urlObj.humanizedUrl, scrutinyData.title],
      colWidths: [40, 120]
    });

    scrutinyData.a11y.failures.forEach(function(failure) {
      var row = {};
      row[failure.severity] = failure.heading + '\n' + failure.elements;
      table.push(row);
    });

    console.log('A11y');
    console.log(table.toString());
    callback(err, scrutinyData);
  });
}
