# scrutinize

[![Build Status](https://secure.travis-ci.org/johnotander/scrutinize.png?branch=master)](https://travis-ci.org/johnotander/scrutinize)

Scrutinize a url by analyzing CSS, HTML, accessibility, images, pagespeed, etc.

## Installation

```bash
npm install --save scrutinize
```

This package has a few dependencies that recommend using a Google Apps Developer API Key. If you
don't already have a Google Apps Developer API Key, you can get one here:
<https://console.developers.google.com>.

You can then set the key as an option:

```javascript
scrutinize('furtive.co', { key: mySecretAPIKey }, function(err, data) {
  doStuffWith(data);
});
```

Or, export it as an environment variable:

```bash
export GAPPS_API_KEY=<YOUR API KEY>
```

## Usage

```javascript
var scrutinize = require('scrutinize');

scrutinize('furtive.co', { key: process.env.GAPPS_API_KEY }, function(err, data) {
  console.log(data);
});
```

#### Using the CLI

Install the package globally:

```
npm i -g scrutinize
```

```bash
scrutinize furtive.co

# Furtive CSS
#
# 5 files from 3 hosts
#
# Leverage browser caching
# Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.
# Leverage browser caching for the following cacheable resources:
#
# http://www.gravatar.com/avatar/2e52ef263083c77e2a0a24454dc6f369.png (5 minutes)
# http://furtive.co/site/index.furtive.min.css (10 minutes)
# http://www.google-analytics.com/analytics.js (2 hours)
#
# Eliminate render-blocking JavaScript and CSS in above-the-fold content
# Your page has 1 blocking CSS resources. This causes a delay in rendering your page.None of the above-the-fold content on your page could be rendered without waiting for the following resources to load. Try to defer or asynchronously load blocking resources, or inline the critical portions of those resources directly in the HTML.
# Optimize CSS Delivery of the following:
#
# http://furtive.co/site/index.furtive.min.css
#
# Size tap targets appropriately
# Some of the links/buttons on your webpage may be too small for a user to easily tap on a touchscreen. Consider making these tap targets larger to provide a better user experience.
# The following tap targets are close to other nearby tap targets and may need additional spacing around them.
#
# The tap target <a href="http://johnotander.com">John Otander</a> and 1 others are close to other tap targets.
#
#
#
# A11y
#
# Warning
# These elements are focusable but either invisible or obscured by another element
#
# body > .p2.measure:nth-of-type(5) > .py2 > CODE:nth-of-type(3) > A
# body > .txt--center.p2 > .small.p2 > A
# body > .txt--center.p2 > .small.p2 > A:nth-of-type(2)
# body > .txt--center.p2 > .small.p2 > A:nth-of-type(3)
#
# Warning
# Text elements should have a reasonable contrast ratio
#
# #why-furtive > .h4:nth-of-type(2) > A
# #why-furtive > .h4:nth-of-type(2) > A:nth-of-type(2)
# #grid > .measure.p2 > .h4 > A
# #buttons > .w100--s.my1.btn--blue
# #buttons > .w100--s.my1.btn--green
#
#
#
# CSS Stats
#
# Total Selectors 159
# Media Queries 3
# Background Colors 17
# Colors 23
# Widths 3
# Font Sizes 12
#
#
#
# Furtive CSS - furtive.co
#
# Page Speed Score 89
# Resources/Hosts 5/3
# HTML Size 15.92 kB
# Total HTML Elements 271
# CSS Size 6.25 kB
# JS Size 25.75 kB
# IMG Size 4.55 kB
```

## Thanks to the following

* cssstats
* a11y
* psi
* commander
* cli-table

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
