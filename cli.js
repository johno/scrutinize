#! /usr/bin/env node

const meow = require('meow')
const shtml = require('shtml')
const scrutinize = require('./')

const cli = meow(shtml`
  <div>
    <underline>Usage</underline>

    $ scrutinized [url] [options...]<br><br>

    <underline>Options</underline>

    -h, --help - Get help menu
    -v, --version - Get the version
    -a, --a11y - Only return accessibility
    -p, --psi - Only return page speed insights
    -c, --css - Only return cssstats
    -d, --dom - Only return dom stats<br><br>

    <underline>Examples</underline>

    $ scrutinize johnotander.com
    $ scrutinize johnotander.com --css<br><br>
`, {
  alias: {
    h: 'help',
    a: 'a11y',
    p: 'psi',
    c: 'css',
    d: 'dom'
  }
})
