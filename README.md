# scrutinize

[![Build Status](https://secure.travis-ci.org/johnotander/scrutinize.png?branch=master)](https://travis-ci.org/johnotander/scrutinize)

__Currently under development.__

Scrutinize a url by analyzing CSS, HTML, images, pagespeed, etc.

## Installation

```bash
npm install --save scrutinize
```

## Usage

```javascript
var scrutinize = require('scrutinize');

scrutinize('furtive.co', { key: process.env.GAPPS_API_KEY }, function(err, data) {
  console.log(data);
});
```

#### Using the CLI

```bash
scrutinize furtive.co

# Page Speed Insights
# ┌────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
# │ furtive.co                             │ Furtive CSS                                                                                                            │
# ├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
# │ Page Speed Score                       │ 89                                                                                                                     │
# ├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
# │ Requests                               │ 5 files from 3 hosts                                                                                                   │
# ├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
# │ Leverage browser caching               │ Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previo… │
# │                                        │ Leverage browser caching for the following cacheable resources:                                                        │
# │                                        │                                                                                                                        │
# │                                        │ http://www.gravatar.com/avatar/2e52ef263083c77e2a0a24454dc6f369.png                                                    │
# │                                        │ http://furtive.co/site/index.furtive.min.css                                                                           │
# │                                        │ http://www.google-analytics.com/analytics.js                                                                           │
# ├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
# │ Eliminate render-blocking JavaScript … │ Your page has 1 blocking CSS resources. This causes a delay in rendering your page.                                    │
# │                                        │ None of the above-the-fold content on your page could be rendered without waiting for the following resources to load… │
# │                                        │ Optimize CSS Delivery of the following:                                                                                │
# │                                        │                                                                                                                        │
# │                                        │ http://furtive.co/site/index.furtive.min.css                                                                           │
# ├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
# │ Size tap targets appropriately         │ Some of the links/buttons on your webpage may be too small for a user to easily tap on a touchscreen. Consider making… │
# │                                        │ The following tap targets are close to other nearby tap targets and may need additional spacing around them.           │
# └────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
CSS Stats
┌────────────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ furtive.co                             │ Furtive CSS                                                                                                            │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Total Selectors                        │ 159                                                                                                                    │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Media Queries                          │ 3                                                                                                                      │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Colors                                 │ 23                                                                                                                     │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Widths                                 │ 3                                                                                                                      │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Font Sizes                             │ 12                                                                                                                     │
├────────────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Background Colors                      │ 17                                                                                                                     │
└────────────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

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
