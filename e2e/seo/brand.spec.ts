import {expect, type Page, test} from '@playwright/test'
import {expectedHreflangCountries, expectedHreflangUrlsBrands, testUrls} from "../../testdata/seoTestdata";
import CommonPage from "../../src/CommonPage";

test.beforeEach(async ({ page }) => {
  await page.goto(testUrls.brand);
});

test.describe('Brand SEO Tests', () => {
  test('hreflang cluster includes correct countries', async ({page}) => {
    expect(await CommonPage.getHrefCountries(page)).toEqual(expectedHreflangCountries);
  });

  test('hreflang cluster includes correct domain equivalents on PLPs', async ({page}) => {
    const hreflangs = await page.locator('link[rel="alternate"]').all();
    const actualHreflangUrls = await Promise.all(
        hreflangs.map(async (el) =>
            decodeURIComponent(await el.getAttribute('href')),
        ));
    expect(actualHreflangUrls).toEqual(expectedHreflangUrlsBrands);
  });
});