import { Page, Locator } from "@playwright/test";
import { ElementUtil } from "@utils/elementUtil";

export class LoginPage {

    private readonly page: Page;
    private readonly eleutil: ElementUtil;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMsg: Locator;
    private readonly frgtPasswrdLink: Locator;
    private readonly dashboardTxt: Locator;

    // Initialize page elements here
    constructor(page: Page) {
        this.page = page;
        this.eleutil = new ElementUtil(page);
        this.username = this.page.getByRole("textbox", { name: "Username" });
        this.password = this.page.getByRole("textbox", { name: "Password" });
        this.loginBtn = this.page.getByRole("button", { name: "Login" });
        this.warningMsg = this.page.getByText('Invalid credentials')
        this.frgtPasswrdLink = this.page.getByText('Forgot your password?')
        this.dashboardTxt = this.page.getByRole("heading", { name: "Dashboard" });
    }

    // async goToLoginPage(baseURL: string | undefined) {
    //     await this.page.goto(baseURL + 'auth/login');
    // }

    async goToLoginPage(baseURL: string) {
        await this.page.goto(baseURL + 'auth/login');
    }

    async performLogin(user_name: string, pass_word: string) {

        // without use of utility
        /*         await this.username.fill(user_name);
                await this.password.fill(password);
                await this.loginBtn.click(); */

        // using utility methods
        await this.eleutil.fill(this.username, user_name);
        await this.eleutil.fill(this.password, pass_word);
        await this.eleutil.click(this.loginBtn, { force: true, timeout: 5000 });
        // const pageTitle = await this.page.title();
        // console.log(`Home Page Title: ${pageTitle}`);
        // return new HomePage(this.page)
        // return pageTitle;
    }

    public get getDashboardTxt() {
        return this.dashboardTxt;
    }

    // async getInvalidLoginMessage(): Promise<string | null> {
    //     const errorMessage = await this.eleutil.getText(this.warningMsg);
    //     console.log('invalid login warning message: ' + errorMessage);
    //     return errorMessage;
    // }
}