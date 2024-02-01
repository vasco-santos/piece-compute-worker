import path from 'path'
import { Miniflare } from 'miniflare'

export function getMiniflare () {
  return new Miniflare({
    scriptPath: path.join(process.cwd(), 'dist/worker.js'), // Path to your Cloudflare Worker script
    modules: true,
    port: 8788,
    r2Buckets: ['CARPARK'],
    modulesRules: [
      { type: 'ESModule', include: ['**/*.js'], fallthrough: true },
      { type: 'CompiledWasm', include: ['**/*.wasm'] }
    ]
  })
}
