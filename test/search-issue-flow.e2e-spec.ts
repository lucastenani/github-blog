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

test('paginate positions', async ({ page }) => {
  await page.goto('/')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  const firstPage = page.getByRole('button', { name: 'First page' })
  const prevPage = page.getByRole('button', { name: 'Previous page' })
  const nextPage = page.getByRole('button', { name: 'Next page' })
  const lastPage = page.getByRole('button', { name: 'Last page' })

  await expect(firstPage).toBeDisabled()
  await expect(prevPage).toBeDisabled()
  await expect(nextPage).not.toBeDisabled()
  await expect(lastPage).not.toBeDisabled()
  await expect(
    page.locator('h3').filter({ hasText: 'Test Issue 10' }),
  ).toBeVisible()

  await expect(page.getByText('Page 1 of 6')).toBeVisible()

  nextPage.click()
  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await expect(firstPage).not.toBeDisabled()
  await expect(prevPage).not.toBeDisabled()
  await expect(nextPage).not.toBeDisabled()
  await expect(lastPage).not.toBeDisabled()
  await expect(
    page.locator('h3').filter({ hasText: 'Test Issue 11' }),
  ).toBeVisible()

  await expect(page.getByText('Page 2 of 6')).toBeVisible()

  lastPage.click()
  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await expect(firstPage).not.toBeDisabled()
  await expect(prevPage).not.toBeDisabled()
  await expect(nextPage).toBeDisabled()
  await expect(lastPage).toBeDisabled()
  await expect(
    page.locator('h3').filter({ hasText: 'Test Issue 60' }),
  ).toBeVisible()

  await expect(page.getByText('Page 6 of 6')).toBeVisible()

  prevPage.click()
  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await expect(firstPage).not.toBeDisabled()
  await expect(prevPage).not.toBeDisabled()
  await expect(nextPage).not.toBeDisabled()
  await expect(lastPage).not.toBeDisabled()
  await expect(
    page.locator('h3').filter({ hasText: 'Test Issue 50' }),
  ).toBeVisible()
  await expect(page.getByText('Page 5 of 6')).toBeVisible()
  await page.waitForTimeout(2000)
})

test('paginate positions in search', async ({ page }) => {
  await page.goto('/?page=1&query=Test')

  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })

  await page.getByRole('button', { name: 'Next page' }).click()
  await page.waitForSelector('input[placeholder="Search content"]', {
    state: 'visible',
  })
  expect(page.url()).toBe('http://localhost:50789/?page=2&query=Test')
  await expect(
    page.locator('h3').filter({ hasText: 'Test Issue 11' }),
  ).toBeVisible()
  await page.waitForTimeout(500)
})
