import {test,expect} from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://en.zalando.de/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Shop Shoes, Fashion & Accessories Online | Zalando');
});

test('Check Beauty link', async ({ page }) => {
  await page.goto('https://en.zalando.de/');
  await page.getByRole('link', { name: 'Beauty' }).click();
  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'Beauty', exact: true })).toBeVisible();
});