import { expect, test } from '@playwright/test'

test('Not found page', async ({ page }) => {
  await page.goto('/aaaaaaaaaaa')

  const titlePage = page.getByText('Page Not Found')
  const textPage = page.getByText('Back to home')
  const homeLink = page.getByRole('link', { name: 'home' })

  await expect(titlePage).toBeVisible()
  await expect(textPage).toBeVisible()

  homeLink.click()

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  expect(page.url()).toBe('http://localhost:50789/')

  const publicationsText = page.getByText('60 publications')
  const totalItemsText = page.getByText('Total of 60 items')
  const pageInfoText = page.getByText('Page 1 of 6')
  const card1 = page.getByRole('link', { name: 'Test Issue 1 less than a' })
  const card2 = page.getByRole('link', { name: 'Test Issue 2 less than a' })
  const card3 = page.getByRole('link', { name: 'Test Issue 3 less than a' })

  await expect(publicationsText).toBeVisible()
  await expect(totalItemsText).toBeVisible()
  await expect(pageInfoText).toBeVisible()
  await expect(card1).toBeVisible()
  await expect(card2).toBeVisible()
  await expect(card3).toBeVisible()
})

test('No results found', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page.locator('input[placeholder="Search content"]').fill('aaaa')
  await page.getByRole('button', { name: 'Search' }).click()

  const toast = page.getByText('No results found')
  const publicationsText = page.getByText('0 publications')
  const totalItemsText = page.getByText('Total of 0 items')
  const pageInfoText = page.getByText('Page 1 of 1')

  await expect(toast).toBeVisible()
  await expect(publicationsText).toBeVisible()
  await expect(totalItemsText).toBeVisible()
  await expect(pageInfoText).toBeVisible()
})

test('Not found issue', async ({ page }) => {
  await page.goto('/position/99999')

  await expect(page.getByText('Position does not exist :(')).toBeVisible()
  await expect(page.getByText('Position Not Found')).toBeVisible()
  await expect(page.getByText('Back to home')).toBeVisible()
})
