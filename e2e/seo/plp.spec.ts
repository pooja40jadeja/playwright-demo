import {expect, type Page, test} from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://en.zalando.de/clothing/');
});

const expectedHreflangCountries = ['en-de', 'en-gb', 'en-ie'];
const expectedHreflangUrls =
    [
      'https://en.zalando.de/clothing/',
      'https://www.zalando.co.uk/clothing/',
      'https://www.zalando.ie/clothing/'
    ];

test.describe('PLP SEO Tests', () => {
  test('has only one h1 tag', async ({page}) => {
    expect(await page.locator('h1').all()).toHaveLength(1)
  });

  test('has canonical', async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toEqual(page.url());
  });

  test('has alt tags for all images', async ({page}) => {
    const getAltTagsForAllImages = await getAltTagsForImages(page);
    getAltTagsForAllImages.every((alt) =>
        expect(alt.length).toBeGreaterThan(0),
    );
  });

  test('hreflang cluster includes correct countries', async ({page}) => {
    expect(await getHrefCountries(page)).toEqual(expectedHreflangCountries);
  });

  test('hreflang cluster includes correct domain equivalents on PLPs', async ({page}) => {
    const hreflangs = await page.locator('link[rel="alternate"]').all();
    const actualHreflangUrls = await Promise.all(
        hreflangs.map(async (el) =>
            decodeURIComponent(await el.getAttribute('href')),
        ));
    expect(actualHreflangUrls).toEqual(expectedHreflangUrls);
  });
});

async function getAltTagsForImages(page: Page) {
  const images = await page.locator('[data-entity-id^="ern:product::"] img').all();
  return Promise.all(
      images.map(async (image) => image.getAttribute('alt')),
  );
}

async function getHrefCountries(page: Page) {
  const hreflangElements = await page.locator('link[rel="alternate"]').all();
  return Promise.all(
      hreflangElements.map(async (image) => image.getAttribute('hreflang')),
  );
}