import { Page, Locator, expect } from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil {
    private page: Page;
    private defaultTimeOut: number = 30000;

    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeOut;
    }

    /**
     * this method to convert the string to Locator else it will return the semantic based locators on the basis of given index
     * @param locator 
     * @param index 
     * @returns 
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else {
                return this.page.locator(locator).first();
            }
        }
        else {
            if (index) {
                return locator.nth(index);
            }
            else {
                return locator.first();
            }
        }
        // return locator;
    }

    /**
     * Click on element
     * @param locator 
     * @param options 
     * @param index 
     */

    async click(locator: flexibleLocator, options?: { force?: boolean, timeout?: number }, index?: number): Promise<void> {
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });
        console.log(`Clicked on element: ${locator}`);
    }

    /**
     * Double click on element
     * @param locator 
     */
    async doubleClick(locator: flexibleLocator, index?: number): Promise<void> {
        await this.getLocator(locator, index).dblclick({
            timeout: this.defaultTimeOut
        });
        console.log(`Doubled Clicked on element: ${locator}`);
    }

    /**
     * Right Click on element 
     * @param locator 
     */
    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({
            button: 'right',
            timeout: this.defaultTimeOut
        });
        console.log(`Doubled Clicked on element: ${locator}`);
    }

    /**
     * Fill text into intup field
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string, index?: number): Promise<void> {
        await this.getLocator(locator, index).fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled text: ${text} into element: ${locator}`);
    }

    /**
     * Type text with delay as human (default delay: 500ms)
     * @param locator 
     * @param text 
     * @param delay 
     */

    async type(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
        console.log(`Typed text as human: ${text} into element: ${locator}`);
    }

    /**
     * Clear the value from the input filed
     * @param locator 
     */

    async clear(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
        console.log(`Cleared the element: ${locator}`);
    }

    /**
     * Get text context of an element
     * @param locator 
     * @returns 
     */
    async getText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
        // If text is null/undefined, use "" then trim. || and we can add 'undifined' as return in promise with string using or (|)
        return (text ?? "").trim();
    }

    /**
     * Get text context of an element
     * @param locator 
     * @returns 
     */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
        // If text is null/undefined, use "" then trim. || and we can add 'undifined' as return in promise with string using or (|)
        return text.trim();
    }

    /**
     * Get attribute value of an element
     * @param locator 
     * @param attributeName 
     * @returns 
     */
    async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName, { timeout: this.defaultTimeOut });
    }

    /**
     * Get input (entered) value of an element(text field)
     * @param locator 
     * @returns 
     */
    async getInputValue(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
    }

    /**
     * Get all text content from multiple elements
     * @param locator 
     * @returns 
     */
    async getAllTextContent(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts();
    }

    /**
     * Get all the locators
     * @param locator 
     * @returns 
     */
    async getAllLocators(locator: flexibleLocator): Promise<flexibleLocator[]> {
        return await this.getLocator(locator).all();
    }


    // ====================================================== Element Visibility & State Check =========================================== //

    /**
     * Check element is visible or not
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async isVisible(locator: flexibleLocator, index?: number, timeout: number = 5000): Promise<boolean> {
        return await this.getLocator(locator, index).isVisible({ timeout: this.defaultTimeOut });
    }

    /**
     * Check element is hidden or not
     * @param locator 
     * @returns 
     */
    async isHidden(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isHidden({ timeout: this.defaultTimeOut });
    }

    /**
     * Check element is enabled or not
     * @param locator 
     * @returns 
     */
    async isEnabled(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isEnabled({ timeout: this.defaultTimeOut });
    }

    /**
     * Check element is desabled or not
     * @param locator 
     * @returns 
     */
    async isDisabled(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isDisabled({ timeout: this.defaultTimeOut });
    }

    /**
     * Check element is checked (radio/checkbox) or not
     * @param locator 
     * @returns 
     */
    async isChecked(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isChecked({ timeout: this.defaultTimeOut });
    }


    /**
     * Check element is editable or not
     * @param locator 
     * @returns 
     */
    async isEditable(locator: flexibleLocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isEditable({ timeout: this.defaultTimeOut });
    }



    // ====================================================== Wait Utils =========================================== //


    /**
     * wait for element to be visible
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            console.log(`waited for element to be visible`);
            return true;
        }
        catch (error) {
            console.log('E:', error);
            return false;
        }
    }

    /**
     * wait for element to be attached to DOM
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            console.log(`waited for element to be attached to DOM`);
            return true;
        }
        catch (error) {
            console.log('E:', error);
            return false;
        }
    }


    /**
     * Wait for page load state
     * @param state 
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`waited for page load state: ${state}`);
    }

    /**
     * wait for specific timeout (static)
     * @param timeout 
     */
    async sleep(timeout: number): Promise<void> {
        this.page.waitForTimeout(timeout);
        console.log(`waited for ${timeout} ms`);
    }


    // ====================================================== Dropdown - Utils/Select Based Dropdowns  =========================================== //

    async selectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${text} from drop-down ${locator}`);
    }

    async selectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${value} from drop-down ${locator}`);
    }

    async selectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${index} from drop-down ${locator}`);
    }

}