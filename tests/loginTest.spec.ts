import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/loginPage";
import { Env } from "@frameworkConfig/env";


// Pre-requisite execution block before running each test case
// test.beforeEach(async ({ page }) => {
//   // Log active environment credentials details on startup
//   Env.printEnvDetails();
// });

test("user login with valid credentials", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(Env.BASE_URL);
  await loginPage.performLogin(Env.VALID_USERNAME, Env.VALID_PASSWORD);
  await expect(loginPage.getDashboardTxt).toHaveText("Dashboard");
});

test("user login with invalid credentials", async ({ page }) => {
  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(Env.BASE_URL);
  await loginPage.performLogin(Env.INVALID_USERNAME, Env.INVALID_PASSWORD);
  await expect(loginPage.getErrorTxt).toHaveText("Invalid credentials");
});
