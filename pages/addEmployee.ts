import { Page, Locator } from "@playwright/test";
import { ElementUtil } from "@utils/elementUtil";

export class AddEmployee {

    private readonly page: Page;
    private readonly eleutil: ElementUtil;
    private readonly firstNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly employeeId: Locator;
    private readonly createLoginDetailsToggel: Locator;
    private readonly usernameInput: Locator;
    private readonly statusEnabledRadio: Locator;
    private readonly statusDisabledRadio: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly saveBtn: Locator;
    // private readonly successMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eleutil = new ElementUtil(page);

        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.employeeId = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')
        this.createLoginDetailsToggel = page.locator('label').locator('span.oxd-switch-input');
        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.statusEnabledRadio = page.getByRole('radio', { name: 'Enabled' });
        this.statusDisabledRadio = page.getByRole('radio', { name: 'Disabled' });
        this.passwordInput = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('input').first();
        this.confirmPasswordInput = page.locator('.oxd-input-group').filter({ hasText: 'Confirm Password' }).locator('input').first();
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        // this.successMsg = page.getByText('Your Account Has Been Created!', { exact: true });
    }

    async addEmployee(firstName: string, lastName: string, employeeId: string, createLoginDetails: boolean, status: string, middleName?: string, username?: string, password?: string) {
        await this.eleutil.fill(this.firstNameInput, firstName);

        await this.eleutil.fill(this.lastNameInput, lastName);

        await this.eleutil.fill(this.employeeId, employeeId);
        if (middleName) {
            await this.eleutil.fill(this.middleNameInput, middleName);
        }

        // 2. TOGGLE CONDITIONAL LOGIC:
        if (createLoginDetails) {
            // If true, activate the toggle switch to reveal and populate the login credential fields
            await this.eleutil.click(this.createLoginDetailsToggel, { force: true });

            if (!username || !password) {
                throw new Error("Error: Login credentials create karne ke liye Username aur Password dena zaroori hai!");
            }

            await this.eleutil.fill(this.usernameInput, username);
            await this.eleutil.fill(this.passwordInput, password);
            await this.eleutil.fill(this.confirmPasswordInput, password);

            // Managing the account operational status (Enabled/Disabled) is part of the login details setup
            if (status === 'Enabled') {
                await this.eleutil.click(this.statusEnabledRadio, { force: true });
            } else {
                await this.eleutil.click(this.statusDisabledRadio, { force: true });
            }
        } else {
            // Skip conditional login creation sub-forms if portal access is not required
            console.log(`Skipping login details creation for: ${firstName} ${lastName}`);
        }

        // 3. Submit and save the employee profile form (Executes for both workflows)
        await this.eleutil.click(this.saveBtn);

        /*         await this.eleutil.click(this.createLoginDetailsToggel, { force: true });
        
                await this.eleutil.fill(this.usernameInput, username);
        
                if (middleName) {
                    await this.eleutil.fill(this.middleNameInput, middleName);
                }
        
                if (status === 'Enabled') {
                    await this.eleutil.click(this.statusEnabledRadio, { force: true });
                } else {
                    await this.eleutil.click(this.statusDisabledRadio, { force: true });
                }
        
                await this.eleutil.fill(this.passwordInput, password);
        
                await this.eleutil.fill(this.confirmPasswordInput, password);
                await this.eleutil.click(this.saveBtn); */
    }
} 