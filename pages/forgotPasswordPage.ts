import {expect, type Locator, type Page} from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;
    readonly url: string;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://marketplace.mitigram.com/Account/ForgotPassword';
        this.heading = page.getByText('Forgot your password?');
    }

    async pageIsVisible() {
        expect(this.page.url()).toEqual(this.url);
        await expect (this.heading).toBeVisible();
    }
}