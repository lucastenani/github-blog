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

test('should call handleClearFilter on button click', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page.locator('input[placeholder="Search content"]').fill('aaaa')
  await page.getByRole('button', { name: 'Search' }).click()
  await page.getByRole('button', { name: 'Clear filter' }).click()

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

test('should call Filter on button click', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page
    .locator('input[placeholder="Search content"]')
    .fill('Test Issue 60')
  await page.getByRole('button', { name: 'Search' }).click()

  const publicationsText = page.getByText('1 publication')
  const totalItemsText = page.getByText('Total of 1 item')
  const pageInfoText = page.getByText('Page 1 of 1')
  const card1 = page.getByRole('link', { name: 'Test Issue 60 less than a' })
  const card2 = page.getByRole('link', { name: 'Test Issue 2 less than a' })
  const card3 = page.getByRole('link', { name: 'Test Issue 3 less than a' })

  await expect(publicationsText).toBeVisible()
  await expect(totalItemsText).toBeVisible()
  await expect(pageInfoText).toBeVisible()
  await expect(card1).toBeVisible()
  await expect(card2).toBeHidden()
  await expect(card3).toBeHidden()
})

test('should handle input validation errors', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page.getByRole('button', { name: 'Search' }).click()
  const errorText = page.getByText('Search must be at least 1')

  await expect(errorText).toBeVisible()
})

test('should open an issue', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page.getByRole('link', { name: 'Test Issue 1 less than a' }).click()

  const issueTitle = page
    .locator('h3')
    .filter({ hasText: 'Front-End Developer' })
  const issueText1 = page
    .locator('h1')
    .filter({ hasText: 'Front-End Developer' })
  const issueText2 = page
    .locator('h1')
    .filter({ hasText: 'Front-End Developer' })

  await expect(issueTitle).toBeVisible()
  await expect(issueText1).toBeVisible()
  await expect(issueText2).toBeVisible()

  await page.getByRole('link', { name: 'return' }).click()

  const publicationsText = page.getByText('60 publications')
  const totalItemsText = page.getByText('Total of 60 items')
  const pageInfoText = page.getByText('Page 1 of 6')
  const card1 = page.getByRole('link', { name: 'Test Issue 1 less than a' })

  await expect(publicationsText).toBeVisible()
  await expect(totalItemsText).toBeVisible()
  await expect(pageInfoText).toBeVisible()
  await expect(card1).toBeVisible()
})
