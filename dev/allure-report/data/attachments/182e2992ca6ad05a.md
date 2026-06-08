# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: addEmployee.spec.ts >> test add employee without login credentials setup
- Location: tests/addEmployee.spec.ts:51:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Successfully Saved', { exact: true })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "soft toBeVisible" with timeout 10000ms
  - waiting for getByText('Successfully Saved', { exact: true })

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: 12334 677
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Add Employee" [level=6]
- separator
- button "Choose File"
- img "profile picture"
- button ""
- paragraph: "Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px"
- text: Employee Full Name*
- textbox "First Name": Rohan
- textbox "Middle Name": Kumar
- textbox "Last Name": Sharma
- text: Employee Id
- textbox: "67893"
- text: Employee Id already exists
- separator
- paragraph: Create Login Details
- checkbox
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.8
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByText('Successfully Saved', { exact: true })
Expected: "Successfully Saved"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "soft toHaveText" with timeout 10000ms
  - waiting for getByText('Successfully Saved', { exact: true })

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: 12334 677
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Add Employee" [level=6]
- separator
- button "Choose File"
- img "profile picture"
- button ""
- paragraph: "Accepts jpg, .png, .gif up to 1MB. Recommended dimensions: 200px X 200px"
- text: Employee Full Name*
- textbox "First Name": Rohan
- textbox "Middle Name": Kumar
- textbox "Last Name": Sharma
- text: Employee Id
- textbox: "67893"
- text: Employee Id already exists
- separator
- paragraph: Create Login Details
- checkbox
- separator
- paragraph: "* Required"
- button "Cancel"
- button "Save"
- paragraph: OrangeHRM OS 5.8
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from "@pages/loginPage";
  3  | import { HomePage } from "@pages/homePage";
  4  | import { Env } from "@frameworkConfig/env";
  5  | import { AddEmployee } from '@pages/addEmployee';
  6  | 
  7  | let loginPage: LoginPage;
  8  | let homePage: HomePage;
  9  | let addEmployeePage: AddEmployee;
  10 | 
  11 | // Pre-requisite execution block before running each test case
  12 | test.beforeEach(async ({ page }) => {
  13 |   // Log active environment credentials details on startup
  14 |   // Env.printEnvDetails();
  15 | 
  16 |   // Initialize modular Page Object Model classes
  17 |   loginPage = new LoginPage(page);
  18 |   homePage = new HomePage(page);
  19 |   addEmployeePage = new AddEmployee(page);
  20 | 
  21 |   // Execute landing page navigation and login workflows
  22 |   await loginPage.goToLoginPage(Env.BASE_URL);
  23 |   await loginPage.performLogin(Env.VALID_USERNAME, Env.VALID_PASSWORD);
  24 | 
  25 |   // Assert and validate successful user redirection to the Dashboard screen
  26 |   await expect(loginPage.getDashboardTxt).toHaveText("Dashboard");
  27 | });
  28 | 
  29 | test('test add employee with login credentials setup', async () => {
  30 |   // Navigate through structural component links from the HomePage object
  31 |   await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  32 |   await homePage.getTopMenu.selectTopMenuOption('Add Employee');
  33 | 
  34 |   // FIXED: Aligned parameters according to the updated dynamic signature:
  35 |   // Sequence: firstName, lastName, employeeId, createLoginDetails (true), status, middleName, username, password
  36 |   await addEmployeePage.addEmployee(
  37 |     'Jhony',
  38 |     'Walker',
  39 |     'J@12345',
  40 |     true,
  41 |     'Enabled',
  42 |     'M.',
  43 |     'jhonywalker',
  44 |     'jw@0420'
  45 |   );
  46 | 
  47 |   await expect.soft(addEmployeePage.getToastMsg).toBeVisible();
  48 |   await expect.soft(addEmployeePage.getToastMsg).toHaveText("Successfully Saved");
  49 | });
  50 | 
  51 | test('test add employee without login credentials setup', async () => {
  52 |   await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  53 |   await homePage.getTopMenu.selectTopMenuOption('Add Employee');
  54 | 
  55 |   // createLoginDetails = false (Skips credentials and passes blank optional fields safely)
  56 |   await addEmployeePage.addEmployee(
  57 |     'Rohan',
  58 |     'Sharma',
  59 |     '67893',
  60 |     false,
  61 |     'Enabled',
  62 |     'Kumar'
  63 |   );
  64 |   await expect.soft(addEmployeePage.getToastMsg).toBeVisible();
> 65 |   await expect.soft(addEmployeePage.getToastMsg).toHaveText("Successfully Saved");
     |                                                  ^ Error: expect(locator).toHaveText(expected) failed
  66 | });
  67 | 
  68 | /* test('test add employee functionality', async ({ page }) => {
  69 |   await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  70 |   await homePage.getTopMenu.selectTopMenuOption('Add Employee');
  71 | 
  72 |   await addEmployeePage.addEmployee('jhony', 'walker', '12345', 'jhonywalker', 'Enabled', 'jw@420');
  73 | }); */
  74 | 
  75 | // await page.locator("(//div[@class='orangehrm-employee-form']//input[@class='oxd-input oxd-input--active'])[position()=1]");
  76 | // await page.locator('.oxd-switch-input').click();
  77 | // await page.getByRole('radio', { name: 'Enabled' }).click();
  78 | // await page.locator('.oxd-radio-input').first().click();
  79 | // await page.locator('.oxd-radio-input.oxd-radio-input--active').click();
```