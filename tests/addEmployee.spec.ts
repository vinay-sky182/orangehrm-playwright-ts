import { test, expect } from '@playwright/test';
import { LoginPage } from "@pages/loginPage";
import { HomePage } from "@pages/homePage";
import { Env } from "@frameworkConfig/env";
import { AddEmployee } from '@pages/addEmployee';

let loginPage: LoginPage;
let homePage: HomePage;
let addEmployeePage: AddEmployee;

// 1. Har test case se pehle yeh block chalega aur login complete karega
test.beforeEach(async ({ page }) => {
  // Env details ko print karne ke liye
  Env.printEnvDetails();

  // Page objects initialize kiye
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  addEmployeePage = new AddEmployee(page);

  // Login process execution
  await loginPage.goToLoginPage(Env.BASE_URL);
  await loginPage.performLogin(Env.USERNAME, Env.PASSWORD);

  // Verify karein ki login successful raha ya nahi
  await expect(loginPage.getDashboardTxt).toHaveText("Dashboard");
});

test('test add employee functionality', async ({ page }) => {
  await homePage.getLeftMenu.selectLeftMenuOption('PIM');
  await homePage.getTopMenu.selectTopMenuOption('Add Employee');

  await addEmployeePage.addEmployee('jhony', 'walker', '12345', 'jhonywalker', 'Enabled', 'jw@420');
});



// await page.locator("(//div[@class='orangehrm-employee-form']//input[@class='oxd-input oxd-input--active'])[position()=1]");
// await page.locator('.oxd-switch-input').click();
// await page.getByRole('radio', { name: 'Enabled' }).click();
// await page.locator('.oxd-radio-input').first().click();
// await page.locator('.oxd-radio-input.oxd-radio-input--active').click();