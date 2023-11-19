import {expect, type Locator} from '@playwright/test';

export class Tools {
    async checkElementsVisible(...locators: Locator[]): Promise<void> {
        for (const locator of locators) {
            await expect(locator).toBeVisible();
        }
    }
}