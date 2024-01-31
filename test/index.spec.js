import { test, getMiniflare } from './utils/setup.js'
import { randomCAR } from './utils/car.js'

import { digest } from 'fr32-sha2-256-trunc254-padded-binary-tree-multihash/async'
import { Piece } from '@web3-storage/data-segment'

// Create a new Miniflare environment for each test
test.before((t) => {
  t.context = {
    mf: getMiniflare()
  }
})

test('piece-compute', async (t) => {
  const carFile = await randomCAR(100)

  const carpark = await t.context.mf.getR2Bucket('CARPARK')
  await carpark.put(`${carFile.cid}/${carFile.cid}.car`, carFile.bytes)

  const res = await t.context.mf.dispatchFetch(`http://localhost:8787/${carFile.cid}`)
  t.assert(res.ok)
  const computedPieceCid = await res.text()

  // compute piece cid locally
  const multihashDigest = await digest(carFile.bytes)
  const testComputedPieceCid = Piece.fromDigest(multihashDigest)

  t.deepEqual(computedPieceCid, testComputedPieceCid.link.toString())
})
