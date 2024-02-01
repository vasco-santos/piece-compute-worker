import type { R2Bucket } from '@cloudflare/workers-types'

export interface Environment {
  CARPARK: R2Bucket
}

export interface Context {
  waitUntil(promise: Promise<void>): void
}
