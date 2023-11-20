import {expect, test} from '@playwright/test';
import {CareersPage} from '../pages/careersPage';
import {Tools} from '../common/tools';

test.describe.parallel('Career page testing', () => {
    let tools: Tools;
    let careersPage: CareersPage;

    test.beforeEach(async ({page}) => {
        tools = new Tools();
        careersPage = new CareersPage(page);
        await careersPage.goto();
    });

    // NOTICE: the tests below execute sequentially. If one test fails, the following are skipping.
    test.describe.serial('Open positions button testing', () => {
        test('Check the button Open positions is visible pass', async () => {
            await tools.checkElementsVisible(careersPage.buttonOpenPositions)
        });

        test('Check the button Open positions navigation pass', async () => {
            await expect(careersPage.careersBlock).not.toBeInViewport();
            await careersPage.buttonOpenPositions.click();
            await expect(careersPage.careersBlock).toBeInViewport();
        });
    });

    test.describe.serial('Open positions block testing', () => {
        test('Check the Open positions block tabs include texts pass', async () => {
            /*
                NOTICE: it is also possible to move all the strings used in tests to separate files (e.g.,
                testdata.json) for better management of a large number of texts used on the project or for testing
                the service with the multilanguage support.
             */
            const textsToCheck: string[] = ['All', 'Data', 'Engineering', 'Legal', 'Product'];
            await careersPage.checkElementsByLocatorContainTexts(
                careersPage.tabPositionType,
                ...textsToCheck
            )
        });

        test('Check the Open positions block list items include texts pass', async () => {
            await careersPage.checkElementsByLocatorContainTexts(
                careersPage.listItemPositionElements.name,
                'BI Analyst',
                'QA Automation Engineer',
                'Back-end Software Engineer',
                'Front-end Software Engineer',
                'Legal Counsel',
                'Product Implementation Consultant'
            )
        });

        test('Check the Open positions block list items include elements under spoiler pass', async () => {
            await careersPage.checkElementsNotInViewport(
                careersPage.listItemPositionElements.textPositionSummary,
                careersPage.listItemPositionElements.buttonLearnMore,
                careersPage.listItemPositionElements.buttonApplyForPosition,
            );

            await careersPage.listItemPositionElements.name.getByText('BI Analyst').click();

            await careersPage.checkElementsInViewport(
                careersPage.listItemPositionElements.textPositionSummary,
                careersPage.listItemPositionElements.buttonLearnMore,
                careersPage.listItemPositionElements.buttonApplyForPosition,
            );
        });

        test('Check the Open positions filtering by a position type pass', async () => {
            await careersPage.tabPositionType.getByText('Data').click();
            await careersPage.checkPositionsInViewport(
                'BI Analyst'
            )
            await careersPage.checkPositionsNotInViewport(
                'QA Automation Engineer',
                'Back-end Software Engineer',
                'Front-end Software Engineer',
                'Legal Counsel',
                'Product Implementation Consultant'
            )

            await careersPage.tabPositionType.getByText('Engineering').click();
            //further filtering cases' implementation is omitted
        });
    });
})
