import { test, expect } from '@playwright/test';
import { LoginPage } from "@pages/loginPage";
import { HomePage } from "@pages/homePage";
import { Env } from "@frameworkConfig/env";
import { AddEmployee } from '@pages/addEmployee';

let loginPage: LoginPage;
let homePage: HomePage;
let addEmployeePage: AddEmployee;

// Pre-requisite execution block before running each test case
test.beforeEach(async ({ page }) => {
  // Log active environment credentials details on startup
  // Env.printEnvDetails();

  // Initialize modular Page Object Model classes
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  addEmployeePage = new AddEmployee(page);

  // Execute landing page navigation and login workflows
  await loginPage.goToLoginPage(Env.BASE_URL);
  await loginPage.performLogin(Env.VALID_USERNAME, Env.VALID_PASSWORD);

  // Assert and validate successful user redirection to the Dashboard screen
  await expect(loginPage.getDashboardTxt).toHaveText("Dashboard");
});

test('test add employee with login credentials setup', async () => {
  // Navigate through structural component links from the HomePage object
  await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  await homePage.getTopMenu.selectTopMenuOption('Add Employee');

  // FIXED: Aligned parameters according to the updated dynamic signature:
  // Sequence: firstName, lastName, employeeId, createLoginDetails (true), status, middleName, username, password
  await addEmployeePage.addEmployee(
    'Jhony',
    'Walker',
    'J@12345',
    true,
    'Enabled',
    'M.',
    'jhonywalker',
    'jw@0420'
  );

  await expect.soft(addEmployeePage.getToastMsg).toBeVisible();
  await expect.soft(addEmployeePage.getToastMsg).toHaveText("Successfully Saved");
});

test('test add employee without login credentials setup', async () => {
  await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  await homePage.getTopMenu.selectTopMenuOption('Add Employee');

  // createLoginDetails = false (Skips credentials and passes blank optional fields safely)
  await addEmployeePage.addEmployee(
    'Rohan',
    'Sharma',
    '67893',
    false,
    'Enabled',
    'Kumar'
  );
  await expect.soft(addEmployeePage.getToastMsg).toBeVisible();
  await expect.soft(addEmployeePage.getToastMsg).toHaveText("Successfully Saved");
});

/* test('test add employee functionality', async ({ page }) => {
  await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  await homePage.getTopMenu.selectTopMenuOption('Add Employee');

  await addEmployeePage.addEmployee('jhony', 'walker', '12345', 'jhonywalker', 'Enabled', 'jw@420');
}); */

// await page.locator("(//div[@class='orangehrm-employee-form']//input[@class='oxd-input oxd-input--active'])[position()=1]");
// await page.locator('.oxd-switch-input').click();
// await page.getByRole('radio', { name: 'Enabled' }).click();
// await page.locator('.oxd-radio-input').first().click();
// await page.locator('.oxd-radio-input.oxd-radio-input--active').click();