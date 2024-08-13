import { expect, test } from '@playwright/test'

test('Render loading state and then content', async ({ page }) => {
  await page.goto('/')

  const skeleton = page.locator('.animate-pulse').first()
  await expect(skeleton).toBeVisible()
})

test('Render fetched data', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  const nameText = page.getByText('Lucas Tenani')
  const loginText = page.getByText('lucastenani')
  const bioText = page.getByText(
    'Full Stack Developer passionate about technology and innovation.',
  )
  const locationText = page.getByText('São Paulo, Brazil')
  const followersNumber = page.getByText('1500 followers')

  await expect(nameText).toBeVisible()
  await expect(loginText).toBeVisible()
  await expect(bioText).toBeVisible()
  await expect(locationText).toBeVisible()
  await expect(followersNumber).toBeVisible()
})
