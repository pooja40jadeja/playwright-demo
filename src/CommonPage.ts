import type {Page} from "@playwright/test";

class CommonPage {
    public async getHrefCountries(page: Page) {
        const hreflangElements = await page.locator('link[rel="alternate"]').all();
        return Promise.all(
            hreflangElements.map(async (image) => image.getAttribute('hreflang')),
        );
    }
}

export default new CommonPage();