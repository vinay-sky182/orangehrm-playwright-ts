import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// process.cwd() returns the current working directory of the Node.js process, which is typically the root directory of your project. By using path.resolve(process.cwd(), ".env"), you are constructing an absolute path to the .env file located in the root directory of your project. This ensures that the dotenv package can correctly locate and load the environment variables defined in the .env file, regardless of where the script is executed from within the project structure.

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ [ "html", { open: "on-failure" } ], [ "list" ] ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  expect: {
    timeout: 10000,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    navigationTimeout: 15000,
    actionTimeout: 10000,
    trace: "on-first-retry",
    headless: false,
    screenshot: "on",
    video: "on",
    baseURL: process.env.BASE_URL,
  },

  metadata: {
    appUserName: process.env.TEST_USERNAME,
    appPassword: process.env.TEST_PASSWORD,
    // appUserName: 'pwtest@nal.com',
    // appPassword: 'test123'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: {
        ...devices[ 'Desktop Chrome' ],
        channel: "chrome",
        // viewport: null,
        // launchOptions: {
        //   args: [ "--start-maximized" ],
        //   ignoreDefaultArgs: [ "--window-size=1920,1080" ],
        // },
      },
    },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //     viewport: null,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //       ignoreDefaultArgs: ['--window-size=1280,720']
    //     }
    //   }
    // },

    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     viewport: { width: 1920, height: 1080 },
    //     // launchOptions: {
    //     //   args: ['--start-maximized'],
    //     //   ignoreDefaultArgs: ['--window-size=1280,720']
    //     // }
    //   }
    // },

    // {
    //   name: 'WebKit',
    //   use: {
    //     browserName: 'webkit',
    //     viewport: { width: 1920, height: 1080 },
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //       ignoreDefaultArgs: ['--window-size=1280,720']
    //     }
    //   }
    // },

    // {
    //   name: 'chromium',
    //   use: { ...devices[ 'Desktop Chrome' ] },
    //   // name: 'Chromium',
    //   // use: {
    //   //   browserName: 'chromium',
    //   //   viewport: { width: 1920, height: 1080 },
    //   //   launchOptions: {
    //   //     args: ['--start-maximized'],
    //   //     ignoreDefaultArgs: ['--window-size=1280,720']
    //   //   }
    //   // }
    // }
  ],
});
