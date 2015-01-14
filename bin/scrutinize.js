#!/usr/bin/env node

var program = require('commander');
var scrutinize = require('..');

var version = '0.0.1'

console.log('Scrutinize CLI (' + version + ')');

program
  .command('*')
  .description('scrutinize a url')
  .action(function(url) {
    try {
      scrutinize(url, { verbose: true }, function() {});
    } catch (e) {
      console.log('Scrutinize encountered an error' + e);
    }
  });

program.parse(process.argv);
