# scrutinize [![Build Status](https://secure.travis-ci.org/johnotander/scrutinize.png?branch=master)](https://travis-ci.org/johnotander/scrutinize) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Scrutinize a url by analyzing its css, html, a11y, images, and pagespeed score.

## Installation

```sh
npm i -S scrutinize
```

## Usage

```javascript
const scrutinize = require('scrutinize')

scrutinize('google.com')
  .then(doStuff)
  .catch(handleError)
```

## Related

- [cssstats](https://github.com/jxnblk/css-statistics)
- [a11y](https://github.com/addyosmani/a11y)
- [psi](https://github.com/addyosmani/psi)
- [tmi](https://github.com/addyosmani/tmi)
- [dom-stats](https://github.com/johnotander/dom-stats)

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
