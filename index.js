'use strict'

const isBlank = require('is-blank')
const a11y = require('a11y')
const tmi = require('a11y')
const psi = require('psi')
const getCss = require('get-css')
const domStats = require('dom-stats')
const cssstats = require('cssstats')
const got = require('got')
const pify = require('pify')
const normalizeUrl = require('normalize-url')

module.exports = (url, opts) => {
  if (isBlank(url) || typeof url !== 'string') {
    throw new TypeError('scrutinize expected a url as a string')
  }

  url = normalizeUrl(url)

  const options = Object.assign({}, opts || {}, {
    getCss: {
      ignoreCerts: true,
      timeout: 2000
    }
  })


  return new Promise((resolve, reject) => {
    Promise.all([
      css(url, options.getCss),
      pagespeed(url, options.psi),
      accessibility(url),
      dom(url)
    ])
    .then(results => results.reduce((p, c) => Object.assign({}, p, c)))
    .then(resolve)
    .catch(reject)
  })
}

const css = (url, options) => getCss(url, options).then(css => ({ css: cssstats(css.css) }))
const pagespeed = (url, options) => psi(url, options).then(data => ({ psi: data }))
const accessibility = url => pify(a11y)(url).then(data => ({ a11y: data }))
const dom = url => got(url).then(res => ({ dom: domStats(res.body, { ignoreZeroCounts: true }) }))
