import {test} from '@playwright/test';
import {Tools} from "../common/tools";
import {LoginPage} from "../pages/loginPage";
import {ForgotPasswordPage} from "../pages/forgotPasswordPage";

test.describe.parallel('Login page testing', () => {
    let tools: Tools;
    let loginPage: LoginPage;
    let forgotPasswordPage: ForgotPasswordPage;

    test.beforeEach(async ({page}) => {
        tools = new Tools();
        loginPage = new LoginPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);
        await loginPage.goto();
    });

    // The tests below execute sequentially. If one test fails, the following are skipping.
    test.describe.serial("Login form testing", () => {
        test('Check Login form elements visibility pass', async () => {
            await tools.checkElementsVisible(
                loginPage.inputEmail,
                loginPage.inputPassword,
                loginPage.buttonLogIn,
                loginPage.linkForgotPassword
            )
        });

        test('Check Login form submit button text changes pass', async () => {
            await loginPage.checkLoginButtonTextContains("Log in")
            await loginPage.buttonLogIn.click();
            await loginPage.checkLoginButtonTextContains("Logging in...")
        });

        test("Check submit form valid credentials pass", async () => {
            //implementation is omitted
        });

        test("Check submit form invalid email fail", async () => {
            //implementation is omitted
        });

        test("Check submit form invalid password fail", async () => {
            //implementation is omitted
        });

        test("Check submit form empty inputs fail", async () => {
            await loginPage.fillAndSubmitLoginForm();
            await loginPage.checkErrorMessageEquals("Email is required The Email field is not a valid e-mail address.")
        });

        test("Check submit form invalid email format fail", async () => {
            const errorMessage: string = "The Email field is not a valid e-mail address.";
            await loginPage.fillAndSubmitLoginForm('some');
            await loginPage.checkErrorMessageEquals(errorMessage)
            //it is possible to add more cases here if the validation logic is custom
        });

        test("Check submit form empty password fail", async () => {
            const errorMessage: string = "Password is required";
            const login: string = 'some@email.com';
            await loginPage.fillAndSubmitLoginFormMail(errorMessage, login)
        });

        test("Check submit form inputs unsupported characters/spaces fail", async () => {
            //implementation is omitted
        });

        test("Check submit form inputs length fail", async () => {
            //implementation is omitted
        });

        test("Check submit form invalid inputs excess tries (CAPTCHA verification) fail", async () => {
            //implementation is omitted
        });

        test("Check submit form valid credentials while account lockout/deactivation/password expiration fail",
            async () => {
                //implementation is omitted
            });

        test("Check the browser's Back button/reload session continuation pass", async () => {
            /*
                other session checks are possible, if the session handling is trickier;
                implementation is omitted
            */
        });

        test("Check submit form inputs with injections fail", async () => {
            /*
                the case makes sense when login form is custom;
                other security checks are possible, like checking the credentials encryption while request or cookies;
                implementation is omitted
            */
        });

        /*
            More cases are possible to cover extended functionality like username (email) change if there is one.
        */
    });

    test('Check the Forgot Password link functionality pass', async () => {
        await loginPage.linkForgotPassword.click();
        await forgotPasswordPage.pageIsVisible();
    });

    /*
        More cases are possible to cover with usage of the Login page functionality together with
        the Forgot password page.
        E.g.: password reset, validation of the old password.
    */
})





