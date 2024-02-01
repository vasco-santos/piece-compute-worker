import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('building worker...')

await build({
  entryPoints: [path.join(__dirname, '..', 'src', 'index.js')],
  bundle: true,
  format: 'esm',
  outfile: path.join(__dirname, '..', 'dist', 'worker.js'),
  loader: {
    '.wasm': 'copy'
  },
  sourcemap: 'external'
})
