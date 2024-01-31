/* eslint-env serviceworker */
import * as Hasher from 'fr32-sha2-256-trunc254-padded-binary-tree-multihash/wasm-import'

import * as Digest from 'multiformats/hashes/digest'
import { Piece } from '@web3-storage/data-segment'

/**
 * @typedef {import('./bindings.js').Environment} Environment
 * @typedef {import('./bindings.js').Context} Context
 */

export default {
  /**
   * @param {Request} request
   * @param {Environment} env
   * @param {Context} ctx
   */
  async fetch (request, env, ctx) {
    const hasher = Hasher.create()

    // TODO: UCANTIFY
    const reqUrl = new URL(request.url)
    const pathname = reqUrl.pathname

    // TODO: Parse CID and verify if CAR
    const cid = pathname.replace('/', '')
    console.log('cid', cid)
    const bucketObject = await env.CARPARK.get(`${cid}/${cid}.car`)

    if (!bucketObject?.body) throw new Error('missing body')
    for await (const chunk of bucketObject?.body) {
      hasher.write(chunk)
    }
    // ⚠️ Because digest size will dependen on the payload (padding)
    // we have to determine number of bytes needed after we're done
    // writing payload
    const digest = new Uint8Array(hasher.multihashByteLength())
    hasher.digestInto(digest, 0, true)

    // There's no GC (yet) in WASM so you should free up
    // memory manually once you're done.
    hasher.free()
    const multihashDigest = Digest.decode(digest)
    // @ts-expect-error some properties from PieceDigest are not present in MultihashDigest
    const piece = Piece.fromDigest(multihashDigest)

    return new Response(piece.toString())
  }
}
