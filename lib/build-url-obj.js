var normalizeUrl = require('normalize-url');
var humanizeUrl = require('humanize-url');

module.exports = function buildUrlObj(url) {
  return {
    url: url,
    humanizedUrl: humanizeUrl(url),
    normalizedUrl: noramlizeUrl(url)
  };
}
