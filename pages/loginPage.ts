import {expect, type Locator, type Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly buttonLogIn: Locator;
    readonly linkForgotPassword: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://marketplace.mitigram.com/Account/Login';
        this.inputEmail = page.getByRole('textbox', {name: 'Email'});
        this.inputPassword = page.getByRole('textbox', {name: 'Password'});
        this.buttonLogIn = page.locator('#loginBtn');
        this.linkForgotPassword = page.getByText('Forgot your password?');
        this.errorMessage = page.locator('div.error');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async checkLoginButtonTextContains(message: string): Promise<void> {
        await expect(this.buttonLogIn).toBeVisible();
        expect(await this.buttonLogIn.innerText()).toContain(message);
    }

    async fillAndSubmitLoginForm(login?: string, password?: string): Promise<void> {
        if (login) {
            await this.inputEmail.fill(login)
        }

        if (password) {
            await this.inputPassword.fill(password)
        }

        await this.buttonLogIn.click();
    }

    async checkErrorMessageEquals(message: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        expect(await this.errorMessage.innerText()).toEqual(message);
    }

    async fillAndSubmitLoginFormMail(message: string, login?: string, password?: string): Promise<void> {
        await this.fillAndSubmitLoginForm(login, password);
        await this.checkErrorMessageEquals(message)
    }
}