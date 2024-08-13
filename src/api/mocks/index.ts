import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { positionMock } from './position-mock'
import { publicationsListMock } from './publications-list-mock'
import { userProfileMock } from './user-profile-mock'

export const worker = setupWorker(
  publicationsListMock,
  userProfileMock,
  positionMock,
)

export async function enableMSW() {
  if (env.MODE === 'test') {
    await worker.start()
  }
}
