import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Env } from "../frameworkConfig/env";

test("user login test", async ({ page }) => {

  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(Env.BASE_URL);
  await loginPage.performLogin(Env.USERNAME, Env.PASSWORD);
  await expect(loginPage.getDashboardTxt).toHaveText("Dashboard");
});
