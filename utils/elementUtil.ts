import { Page, Locator } from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil {
    private page: Page;
    private defaultTimeOut: number = 30000;

    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeOut;
    }

    /**
     * Internal helper to resolve a string selector or Locator into a unified strict Playwright Locator.
     * Handles specific item index filtering safely without broken evaluation for index 0.
     * @param locator - String CSS/XPath selector or an existing Playwright Locator instance.
     * @param index - Optional element sequence position in a matching list (0-indexed).
     * @returns A strict Playwright Locator instance.
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator {
        let finalLocator: Locator;

        if (typeof locator === 'string') {
            finalLocator = this.page.locator(locator);
        } else {
            finalLocator = locator;
        }

        if (index !== undefined) {
            return finalLocator.nth(index);
        }
        return finalLocator.first();

        /*        if (typeof locator === 'string') {
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
                // return locator; */
    }

    /**
     * Standard mouse click action on a targeted web element.
     * @param locator - Target string selector or Locator object.
     * @param options - Optional modifier configs (force bypass click restrictions or custom timeout overrides).
     * @param index - Optional numerical index position if targeting an array of elements.
     */
    async click(locator: flexibleLocator, options?: { force?: boolean, timeout?: number }, index?: number): Promise<void> {
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });
        console.log(`Clicked on element: ${locator}`);
    }

    /**
     * Mouse double click action on a specific UI element.
     * @param locator - Target string selector or Locator object.
     * @param index - Optional numerical index position inside matching layout elements.
     */
    async doubleClick(locator: flexibleLocator, index?: number): Promise<void> {
        await this.getLocator(locator, index).dblclick({
            timeout: this.defaultTimeOut
        });
        console.log(`Double Clicked on element: ${locator}`);
    }

    /**
     * Mouse right-click context menu gesture action on a specific element.
     * @param locator - Target string selector or Locator object.
     */
    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({
            button: 'right',
            timeout: this.defaultTimeOut
        });
        console.log(`Right Clicked on element: ${locator}`);
    }

    /**
     * Clears any pre-existing text data inside an input element and fills new content.
     * @param locator - Input web element identifier.
     * @param text - Plain text sequence to feed into the field.
     * @param index - Optional position index tracking target item.
     */
    async fill(locator: flexibleLocator, text: string, index?: number): Promise<void> {
        await this.getLocator(locator, index).fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled text: ${text} into element: ${locator}`);
    }

    /**
     * Types characters sequentially into a text box mimicking natural human keypress delay.
     * @param locator - Input field selector sequence or element locator.
     * @param text - Text string sequence to key in.
     * @param delay - Milliseconds wait gap interval between consecutive characters (Default: 500ms).
     */
    async type(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
        console.log(`Typed text sequentially: ${text} into element: ${locator}`);
    }

    /**
     * Erases the contents entirely from a form field or textbox element.
     * @param locator - Interactive target form element identifier.
     */
    async clear(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
        console.log(`Cleared the element data: ${locator}`);
    }

    /**
     * Fetches unmasked plain text directly from the matching DOM text node elements.
     * @param locator - Target static text element layout mapping.
     * @returns A clean trimmed text node value sequence.
     */
    async getText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
        return (text ?? "").trim();
    }

    /**
     * Fetches the inner layout visible text context block directly off an element.
     * @param locator - Target interactive web display node.
     * @returns Clean parsed and trimmed view text value.
     */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
        return (text ?? "").trim();
    }

    /**
     * Pulls the matching technical structural DOM attribute property node values from elements.
     * @param locator - Technical element target node locator mapping.
     * @param attributeName - Target attribute variable name string (e.g., 'href', 'placeholder').
     * @returns The attribute parameter string value, or null if missing.
     */
    async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName, { timeout: this.defaultTimeOut });
    }

    /**
     * Fetches the current live runtime typed contents inside dynamic form text items.
     * @param locator - Target input item field indicator.
     * @returns Current evaluated string input text contents, or null.
     */
    async getInputValue(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
    }

    /**
     * Extracts dynamic listed strings contents off a block group array list compilation.
     * @param locator - Parent mapping tracker capturing multi-element matches.
     * @returns Array stack compilation listing text elements data strings.
     */
    async getAllTextContent(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts();
    }

    /**
     * Breaks grouped query list selectors down into isolated manageable individual Locator arrays.
     * @param locator - Query tracking identifier tracking list elements.
     * @returns Extracted independent element instance tracking arrays.
     */
    async getAllLocators(locator: flexibleLocator): Promise<Locator[]> {
        return await this.getLocator(locator).all();
    }

    // =================================== Advanced Element Actions & Gestures =================================== //

    /**
     * hovers the mouse pointer over a targeted user element to reveal nested hidden menu drop blocks.
     * @param locator - Interactive layout reference marker to mouse-hover over.
     * @param index - Optional structural list index tracker location.
     */
    async hover(locator: flexibleLocator, index?: number): Promise<void> {
        await this.getLocator(locator, index).hover({ timeout: this.defaultTimeOut });
        console.log(`Hovered mouse cursor over element: ${locator}`);
    }

    /**
     * Scrolls the current screen viewport location down or up until a target element appears into full active visibility frame.
     * @param locator - Element locator reference node tracking view placement.
     */
    async scrollIntoView(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).scrollIntoViewIfNeeded({ timeout: this.defaultTimeOut });
        console.log(`Scrolled web window viewport inline to visibility of element: ${locator}`);
    }

    /**
     * Checks or toggles a target interactive check box/radio input node into an active state.
     * Does nothing if the checkbox is already ticked.
     * @param locator - Target form checkbox input field reference.
     * @param index - Optional listed tracking layout position identifier index.
     */
    async check(locator: flexibleLocator, index?: number): Promise<void> {
        await this.getLocator(locator, index).check({ timeout: this.defaultTimeOut });
        console.log(`Toggled checked option state ON for: ${locator}`);
    }

    /**
     * De-activates or unticks an active selected validation check box form node input item.
     * @param locator - Form checkbox query control item locator mapping.
     * @param index - Optional tracked layout position identifier tracker.
     */
    async uncheck(locator: flexibleLocator, index?: number): Promise<void> {
        await this.getLocator(locator, index).uncheck({ timeout: this.defaultTimeOut });
        console.log(`Toggled checked option state OFF for: ${locator}`);
    }

    // =================================== Element Visibility & State Checks =================================== //

    /**
     * Verifies immediate active on-screen element layout visibility mapping.
     * @param locator - Target tracking UI verification layout node map.
     * @param index - Optional item position array filter context index.
     * @param options - Custom override config flags tracking specific evaluation wait limits.
     * @returns Boolean true if the element is currently visible, false otherwise.
     */
    async isVisible(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isVisible({ timeout: options?.timeout });
    }

    /**
     * Validates whether a target application element is absent, hidden, or completely detached from view.
     * @param locator - UI tracking block element variable target.
     * @param index - Optional target element position context filter index tracking location.
     * @param options - Optional config parameters evaluating execution check timeouts.
     * @returns Boolean tracking visibility hidden state criteria match.
     */
    async isHidden(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isHidden({ timeout: options?.timeout });
    }

    /**
     * Confirms if form inputs or elements are fully interactable and enabled.
     * @param locator - Interactive selector map indicator reference.
     * @param index - Optional index positioning locator arrays.
     * @param options - Custom evaluation timeout settings object mapping.
     * @returns Boolean mapping confirming element action availability status.
     */
    async isEnabled(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isEnabled({ timeout: options?.timeout });
    }

    /**
     * Inspects elements to evaluate if an item option field is grayed out or disabled.
     * @param locator - Technical display element mapping selector identifier.
     * @param index - Optional list array pointer tracking sequence configuration index.
     * @param options - Custom variable limits measuring timeouts constraints tracking execution.
     * @returns Boolean validation true if element status reports blocked or disabled.
     */
    async isDisabled(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isDisabled({ timeout: options?.timeout });
    }

    /**
     * Validates active choice states across boolean validation input radio forms or check selectors.
     * @param locator - Interactive binary option element tracker reference.
     * @param index - Optional listed tracking index placement locator array filters.
     * @param options - Variable execution checks timeout settings block config.
     * @returns Boolean checking option evaluation select marks.
     */
    async isChecked(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isChecked({ timeout: options?.timeout });
    }

    /**
     * Validates if structural form entry element fields accept text edits and modifications.
     * @param locator - Text entry box tracking point locator reference query.
     * @param index - Optional sequence tracking array filtering configuration element point indices.
     * @param options - Variable tracking time bounds mapping limits setup object.
     * @returns Boolean check verifying input textbox interaction states.
     */
    async isEditable(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
        return await this.getLocator(locator, index).isEditable({ timeout: options?.timeout });
    }

    /**
     * Inspects dynamic targets evaluating string label contents or substring message components presence.
     * @param locator - Primary query layout indicator marking container borders.
     * @param text - Partial label sequence or word string fragment to discover inside text structures.
     * @param index - Optional entry element layout sequence array filter index parameters.
     * @param options - Context execution check tracking timeout adjustments properties.
     * @returns Boolean response proving targeted value presence configurations.
     */
    async hasText(locator: flexibleLocator, text: string, index?: number, options?: { timeout?: number }): Promise<boolean> {
        const baseLocator = this.getLocator(locator, index);
        const isPresent = await baseLocator.filter({ hasText: text }).isVisible({ timeout: options?.timeout });
        console.log(`Checked if element '${locator}' has text '${text}': ${isPresent}`);
        return isPresent;
    }

    // =================================== Wait Utils =================================== //

    /**
     * Halts progress execution flows forcing execution threads to wait until element components resolve into visible layout states.
     * @param locator - Core element query mapping indicator.
     * @param timeout - Maximum bound checking wait threshold ceiling parameters in milliseconds (Default: 5000ms).
     * @returns Boolean flag validation evaluating successful layout rendering state criteria.
     */
    async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            console.log(`Waited for element to be visible`);
            return true;
        } catch (error) {
            console.log('Visibility wait condition encountered exceptions:', error);
            return false;
        }
    }

    /**
     * Forces operational wait routines tracking DOM code structural attachments independent of render graphics visibility.
     * @param locator - DOM architecture tracking element query placeholder reference.
     * @param timeout - Action threshold milliseconds boundary limit parameter values (Default: 5000ms).
     * @returns Boolean validation tracking successful script structural injection confirmation.
     */
    async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            console.log(`Waited for element to be attached to DOM`);
            return true;
        } catch (error) {
            console.log('DOM node structural attachment verification encountered failure exceptions:', error);
            return false;
        }
    }

    /**
     * Forces automation flows to hold operational executions checking standard browser rendering phases and window network stability criteria cycles.
     * @param state - Application target evaluation state lifecycle markers ('load', 'domcontentloaded', 'networkidle').
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`Waited for page load state cycle marker: ${state}`);
    }

    /**
     * Generates a structural freeze process holding automated sequences active across specific hardcoded static duration timers.
     * @param timeout - Absolute execution freeze time metric constraints defined strictly inside millisecond values.
     */
    async sleep(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
        console.log(`Suspended automated thread processing blocks for static freeze duration: ${timeout} ms`);
    }

    // =================================== Dropdown Utils =================================== //

    /**
     * Selects standard options matching exact outer interface visible display labels inside technical drop structures.
     * @param locator - Select native form element design reference indicator mapping.
     * @param text - Display text label component string to parse and match active selection.
     */
    async selectByText(locator: flexibleLocator, text: string): Promise<void> {
        await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeOut });
        console.log(`Selected option value label '${text}' from container dropdown: ${locator}`);
    }

    /**
     * Validates and selects dynamic options properties explicitly matching internal technical attribute string parameter codes.
     * @param locator - Technical application element container locator.
     * @param value - DOM choice property backend tag text string identifier mapping options.
     */
    async selectByValue(locator: flexibleLocator, value: string): Promise<void> {
        await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeOut });
        console.log(`Selected dynamic option choice technical mapping criteria value '${value}' from dropdown: ${locator}`);
    }

    /**
     * Matches options item rows sequentially tracking zero-based list selection arrays indexes.
     * @param locator - Structural layout document reference point locator selector target.
     * @param index - Targeted sequence option array index position marker value mapping selections.
     */
    async selectByIndex(locator: flexibleLocator, index: number): Promise<void> {
        await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeOut });
        console.log(`Selected element item sequence row row selection option index [${index}] from dropdown: ${locator}`);
    }
}



// import { Page, Locator, expect } from '@playwright/test';

// type flexibleLocator = string | Locator;

// export class ElementUtil {
//     private page: Page;
//     private defaultTimeOut: number = 30000;

//     constructor(page: Page, timeOut: number = 30000) {
//         this.page = page;
//         this.defaultTimeOut = timeOut;
//     }

//     /**
//          * Internal helper to resolve a string selector or Locator into a unified strict Playwright Locator.
//          * Handles specific item index filtering safely without broken evaluation for index 0.
//          * @param locator - String CSS/XPath selector or an existing Playwright Locator instance.
//          * @param index - Optional element sequence position in a matching list (0-indexed).
//          * @returns A strict Playwright Locator instance.
//          */
//     private getLocator(locator: flexibleLocator, index?: number): Locator {
//         let finalLocator: Locator;

//         if (typeof locator === 'string') {
//             finalLocator = this.page.locator(locator);
//         } else {
//             finalLocator = locator;
//         }

//         // FIXED: Checks index properly even if it is 0
//         if (index !== undefined) {
//             return finalLocator.nth(index);
//         }
//         return finalLocator.first();
//         /*        if (typeof locator === 'string') {
//                    if (index !== undefined) {
//                        return this.page.locator(locator).nth(index);
//                    }
//                    else {
//                        return this.page.locator(locator).first();
//                    }
//                }
//                else {
//                    if (index) {
//                        return locator.nth(index);
//                    }
//                    else {
//                        return locator.first();
//                    }
//                }
//                // return locator; */
//     }

//     /**
//          * Standard mouse click action on a targeted web element.
//          * @param locator - Target string selector or Locator object.
//          * @param options - Optional modifier configs (force bypass click restrictions or custom timeout overrides).
//          * @param index - Optional numerical index position if targeting an array of elements.
//          */

//     async click(locator: flexibleLocator, options?: { force?: boolean, timeout?: number }, index?: number): Promise<void> {
//         await this.getLocator(locator, index).click({
//             force: options?.force,
//             timeout: options?.timeout || this.defaultTimeOut
//         });
//         console.log(`Clicked on element: ${locator}`);
//     }

//     /**
//          * Mouse double click action on a specific UI element.
//          * @param locator - Target string selector or Locator object.
//          * @param index - Optional numerical index position inside matching layout elements.
//          */
//     async doubleClick(locator: flexibleLocator, index?: number): Promise<void> {
//         await this.getLocator(locator, index).dblclick({
//             timeout: this.defaultTimeOut
//         });
//         console.log(`Doubled Clicked on element: ${locator}`);
//     }

//     /**
//          * Mouse right-click context menu gesture action on a specific element.
//          * @param locator - Target string selector or Locator object.
//          */
//     async rightClick(locator: flexibleLocator): Promise<void> {
//         await this.getLocator(locator).click({
//             button: 'right',
//             timeout: this.defaultTimeOut
//         });
//         console.log(`Right Clicked on element: ${locator}`);
//     }

//     /**
//      * Fill text into intup field
//      * @param locator
//      * @param text
//      */
//     async fill(locator: flexibleLocator, text: string, index?: number): Promise<void> {
//         await this.getLocator(locator, index).fill(text, { timeout: this.defaultTimeOut });
//         console.log(`Filled text: ${text} into element: ${locator}`);
//     }

//     /**
//      * Type text with delay as human (default delay: 500ms)
//      * @param locator
//      * @param text
//      * @param delay
//      */

//     async type(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
//         await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
//         console.log(`Typed text as human: ${text} into element: ${locator}`);
//     }

//     /**
//      * Clear the value from the input filed
//      * @param locator
//      */

//     async clear(locator: flexibleLocator): Promise<void> {
//         await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
//         console.log(`Cleared the element: ${locator}`);
//     }

//     /**
//      * Get text context of an element
//      * @param locator
//      * @returns
//      */
//     async getText(locator: flexibleLocator): Promise<string> {
//         const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
//         // If text is null/undefined, use "" then trim. || and we can add 'undifined' as return in promise with string using or (|)
//         return (text ?? "").trim();
//     }

//     /**
//      * Get text context of an element
//      * @param locator
//      * @returns
//      */
//     async getInnerText(locator: flexibleLocator): Promise<string> {
//         const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
//         // If text is null/undefined, use "" then trim. || and we can add 'undifined' as return in promise with string using or (|)
//         return text.trim();
//     }

//     /**
//      * Get attribute value of an element
//      * @param locator
//      * @param attributeName
//      * @returns
//      */
//     async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null> {
//         return await this.getLocator(locator).getAttribute(attributeName, { timeout: this.defaultTimeOut });
//     }

//     /**
//      * Get input (entered) value of an element(text field)
//      * @param locator
//      * @returns
//      */
//     async getInputValue(locator: flexibleLocator): Promise<string | null> {
//         return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
//     }

//     /**
//      * Get all text content from multiple elements
//      * @param locator
//      * @returns
//      */
//     async getAllTextContent(locator: flexibleLocator): Promise<string[]> {
//         return await this.getLocator(locator).allInnerTexts();
//     }

//     /**
//      * Get all the locators
//      * @param locator
//      * @returns
//      */
//     async getAllLocators(locator: flexibleLocator): Promise<flexibleLocator[]> {
//         return await this.getLocator(locator).all();
//     }


//     // ====================================================== Element Visibility & State Check =========================================== //

//     /**
//      * Check element is visible or not
//      * @param locator
//      * @param timeout
//      * @returns
//      */
//     async isVisible(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isVisible({ timeout: options?.timeout });
//     }

//     /**
//      * Check element is hidden or not
//      * @param locator
//      * @returns
//      */
//     async isHidden(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isHidden({ timeout: options?.timeout });
//     }

//     /**
//      * Check element is enabled or not
//      * @param locator
//      * @returns
//      */
//     async isEnabled(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isEnabled({ timeout: options?.timeout });
//     }

//     /**
//      * Check element is desabled or not
//      * @param locator
//      * @returns
//      */
//     async isDisabled(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isDisabled({ timeout: options?.timeout });
//     }

//     /**
//      * Check element is checked (radio/checkbox) or not
//      * @param locator
//      * @returns
//      */
//     async isChecked(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isChecked({ timeout: options?.timeout });
//     }


//     /**
//      * Check element is editable or not
//      * @param locator
//      * @returns
//      */
//     async isEditable(locator: flexibleLocator, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         return await this.getLocator(locator, index).isEditable({ timeout: options?.timeout });
//     }

//     /**
//      * Check if an element contains a specific text or substring (Returns true/false)
//      * @param locator Base element locator or selector string
//      * @param text The text or substring to search for
//      * @param index Optional element index (e.g., 0 for first item in a list)
//      * @param options Optional configuration for timeout
//     */
//     async hasText(locator: flexibleLocator, text: string, index?: number, options?: { timeout?: number }): Promise<boolean> {
//         // 1. Base locator uthaya (chahe string ho ya strict Playwright Locator object)
//         const baseLocator = this.getLocator(locator, index);

//         // 2. Playwright ke native filter aur isVisible ke sath timeout pass karke result return kiya
//         const isPresent = await baseLocator.filter({ hasText: text }).isVisible({ timeout: options?.timeout });

//         console.log(`Checked if element '${locator}' has text '${text}': ${isPresent}`);
//         return isPresent;
//     }

//     // ====================================================== Wait Utils =========================================== //


//     /**
//      * wait for element to be visible
//      * @param locator
//      * @param timeout
//      * @returns
//      */
//     async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
//         try {
//             await this.getLocator(locator).waitFor({ state: 'visible', timeout });
//             console.log(`waited for element to be visible`);
//             return true;
//         }
//         catch (error) {
//             console.log('E:', error);
//             return false;
//         }
//     }

//     /**
//      * wait for element to be attached to DOM
//      * @param locator
//      * @param timeout
//      * @returns
//      */
//     async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
//         try {
//             await this.getLocator(locator).waitFor({ state: 'attached', timeout });
//             console.log(`waited for element to be attached to DOM`);
//             return true;
//         }
//         catch (error) {
//             console.log('E:', error);
//             return false;
//         }
//     }


//     /**
//      * Wait for page load state
//      * @param state
//      */
//     async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
//         await this.page.waitForLoadState(state);
//         console.log(`waited for page load state: ${state}`);
//     }

//     /**
//      * wait for specific timeout (static)
//      * @param timeout
//      */
//     async sleep(timeout: number): Promise<void> {
//         await this.page.waitForTimeout(timeout);
//         console.log(`waited for ${timeout} ms`);
//     }


//     // ====================================================== Dropdown - Utils/Select Based Dropdowns  =========================================== //

//     async selectByText(locator: flexibleLocator, text: string) {
//         await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeOut });
//         console.log(`selected option ${text} from drop-down ${locator}`);
//     }

//     async selectByValue(locator: flexibleLocator, value: string) {
//         await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeOut });
//         console.log(`selected option ${value} from drop-down ${locator}`);
//     }

//     async selectByIndex(locator: flexibleLocator, index: number) {
//         await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeOut });
//         console.log(`selected option ${index} from drop-down ${locator}`);
//     }

// }