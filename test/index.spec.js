import { test, getMiniflare } from './utils/setup.js'

// Create a new Miniflare environment for each test
test.before((t) => {
  t.context = {
    mf: getMiniflare()
  }
})

test('piece-compute', async (t) => {
  const res = await t.context.mf.dispatchFetch('http://localhost:8787/bagbaiera222226db4v4oli5fldqghzgbv5rqv3n4ykyfxk7shfr42bfnqwua')
  t.assert(res.ok)
})
