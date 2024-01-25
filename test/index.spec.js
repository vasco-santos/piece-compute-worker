import { test, getMiniflare } from './utils/setup.js'

// Create a new Miniflare environment for each test
test.before((t) => {
  t.context = {
    mf: getMiniflare()
  }
})

test('piece-compute', async (t) => {
  const res = await t.context.mf.dispatchFetch('http://localhost:8787')
  t.assert(res.ok)
})
