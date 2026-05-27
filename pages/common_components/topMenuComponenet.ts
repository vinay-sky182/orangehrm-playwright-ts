import { Page, Locator } from "@playwright/test";
import { ElementUtil } from '@utils/elementUtil';

export class TopMenuComponent {
    private readonly page: Page;
    private readonly eleutil: ElementUtil;


    constructor(page: Page) {
        this.page = page;
        this.eleutil = new ElementUtil(page);
    }

    async selectTopMenuOption(topMenuOption: string) {
        await this.page.getByRole('link', { name: topMenuOption }).click();
    }
}