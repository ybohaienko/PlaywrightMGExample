import {expect, type Locator, type Page} from '@playwright/test';

export class CareersPage {
    readonly page: Page;
    readonly url: string;
    readonly buttonOpenPositions: Locator;
    readonly headingOpenPositions: Locator;
    readonly careersBlock: Locator;
    readonly tabPositionType: Locator;
    readonly listItemPosition: Locator;
    readonly listItemPositionElements: {
        name: Locator;
        textPositionSummary: Locator,
        buttonLearnMore: Locator,
        buttonApplyForPosition: Locator,
    };

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://www.mitigram.com/careers';
        this.buttonOpenPositions = page.locator('a', {hasText: 'Open positions'});
        this.headingOpenPositions = page.locator('h3 #open-positions');
        this.careersBlock = page.locator('#faq');
        this.tabPositionType = this.careersBlock.getByRole('listitem');

        this.listItemPosition = page.locator('[class*="js-module"]');
        this.listItemPositionElements = {
            name: this.listItemPosition.getByRole('link'),
            textPositionSummary: this.listItemPosition.getByRole('paragraph'),
            buttonLearnMore: this.listItemPosition.getByRole('link', {name: 'Learn more'}),
            buttonApplyForPosition: this.listItemPosition.getByRole('link', {name: 'Apply for this position'})
        }
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async checkElementsByLocatorContainTexts(locator: Locator, ...texts: string[]) {
        for (const elementInnerText of await locator.allInnerTexts()) {
            expect(texts.includes(elementInnerText));
        }
    }

    async checkElementsInViewport(...elements: Locator[]) {
        for (const element of elements) {
            await expect(element).toBeInViewport();
        }
    }

    async checkElementsNotInViewport(...elements: Locator[]) {
        for (const element of elements) {
            await expect(element).not.toBeInViewport();
        }
    }

    async checkPositionsInViewport(...positionSummaries: string[]) {
        for (const positionSummary of positionSummaries) {
            await this.checkElementsInViewport(
                this.listItemPositionElements.name.getByText(positionSummary))
        }
    }

    async checkPositionsNotInViewport(...positionSummaries: string[]) {
        for (const positionSummary of positionSummaries) {
            await this.checkElementsNotInViewport(
                this.listItemPositionElements.name.getByText(positionSummary))
        }
    }
}