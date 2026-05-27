import { Page, Locator } from "@playwright/test";
import { LeftMenuComponent } from "@pages/common_components/leftMenuComponent";
import { TopMenuComponent } from "@pages/common_components/topMenuComponenet";

export class HomePage {

    private readonly page: Page;
    private readonly locator: Locator;
    private readonly leftMenu: LeftMenuComponent;
    private readonly topMenu: TopMenuComponent;

    constructor(page: Page) {
        this.page = page;
        this.locator = page.locator('header');
        this.leftMenu = new LeftMenuComponent(page);
        this.topMenu = new TopMenuComponent(page);
    }

    get getLeftMenu() {
        return this.leftMenu;
    }

    get getTopMenu() {
        return this.topMenu;
    }
}