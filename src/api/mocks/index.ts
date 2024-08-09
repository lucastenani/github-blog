import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { publicationsListMock } from './publications-list-mock'

export const worker = setupWorker(publicationsListMock)

export async function enableMSW() {
  if (env.MODE === 'test') {
    await worker.start()
  }
}
