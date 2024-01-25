import { Miniflare } from 'miniflare'

export function getMiniflare () {
  return new Miniflare({
    scriptPath: 'src/index.js',
    modules: true
  })
}
