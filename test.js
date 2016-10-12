const test = require('ava')
const scrutinize = require('./')

test('throws with no url', t => t.throws(scrutinize))

test('returns the expected data', async t => {
  const data = await scrutinize('johnotander.com')
  console.log(data)

  t.truthy(data)
})
