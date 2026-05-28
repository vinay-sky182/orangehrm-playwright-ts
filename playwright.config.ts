import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// 1. Terminal se ENV variable read karein (dev ya qa). Agar kuch nahi diya toh default 'qa' chalega
const environment = process.env.ENV || 'qa';

dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

// process.cwd() returns the current working directory of the Node.js process, which is typically the root directory of your project. By using path.resolve(process.cwd(), ".env"), you are constructing an absolute path to the .env file located in the root directory of your project. This ensures that the dotenv package can correctly locate and load the environment variables defined in the .env file, regardless of where the script is executed from within the project structure.

/* 
// 3️⃣ Loading ke baad .env file se BROWSER_ENV ka naam nikalna aur use lowercase karna
const currentBrowser = (process.env.BROWSER_ENV || 'chrome').toLowerCase().trim();

// 2. SMART BROWSER MAPPING LOGIC
const getDynamicProjects = () => {
  // .env file se browser names read karein, agar khali ho toh default 'chrome' rakhein
  const browserConfig = process.env.BROWSER_ENV || 'chrome';
  const selectedBrowsers = browserConfig.split(',').map(b => b.trim().toLowerCase());

  const projectArray: ReturnType<typeof defineConfig>[ 'projects' ] = [];

  // 🟢 FIXED LINE: Agar pipeline ya terminal se explicitly '--project' manga gaya hai,
  // toh filter bypass karo aur saare browsers ko array me push hone do.
  const bypassFilter = process.argv.join(' ').includes('--project');

  // Agar file me 'chrome' likha hai ya pipeline se chal raha hai
  if (bypassFilter || selectedBrowsers.includes('chrome')) {
    projectArray.push({
      name: 'Google Chrome',
      use: { ...devices[ 'Desktop Chrome' ], channel: "chrome" },
    });
  }

  // Agar file me 'msedge' likha hai ya pipeline se chal raha hai
  if (bypassFilter || selectedBrowsers.includes('msedge') || selectedBrowsers.includes('edge')) {
    projectArray.push({
      name: 'Microsoft Edge',
      use: { ...devices[ 'Desktop Edge' ], channel: 'msedge' },
    });
  }

  // Agar file me 'firefox' likha hai ya pipeline se chal raha hai
  if (bypassFilter || selectedBrowsers.includes('firefox')) {
    projectArray.push({
      name: 'Firefox',
      use: { ...devices[ 'Desktop Firefox' ] },
    });
  }

  // Agar file me 'safari' ya 'webkit' likha hai ya pipeline se chal raha hai
  if (bypassFilter || selectedBrowsers.includes('safari') || selectedBrowsers.includes('webkit')) {
    projectArray.push({
      name: 'Safari',
      use: { ...devices[ 'Desktop Safari' ] },
    });
  }

  return projectArray;
}; 
*/

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [ "html", { open: "on-failure" } ],
    [ "list" ],
    [ "allure-playwright", { outputFolder: 'allure-results' } ],
    [
      "playwright-html-reporter",
      {
        testFolder: "tests",
        title: "OrangeHRM Test Report",
        project: "OrangeHRM",
        release: "1.0",
        testEnvironment: "QA",
        embedAssets: true,
        outputFolder: "playwright-html-report",
        minifyAssets: true,
        startServer: false,
      },
    ],
  ],
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
    appUserName: process.env.TEST_VALID_USERNAME,
    appPassword: process.env.TEST_VALID_PASSWORD,
    // appUserName: 'pwtest@nal.com',
    // appPassword: 'test123'
  },


  // 🚀 MAGIC: Playwright automatic aapki .env file ke mutabik browser list load karega
  // projects: getDynamicProjects(),

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

    {
      name: 'Microsoft Edge',
      use: {
        ...devices[ 'Desktop Edge' ],
        channel: 'msedge',
        // viewport: null,
        // launchOptions: {
        //   args: [ '--start-maximized' ],
        //   ignoreDefaultArgs: [ '--window-size=1280,720' ]
        // }
      }
    },

    {
      name: 'Firefox',
      use: {
        ...devices[ 'Desktop Firefox' ],
        browserName: 'firefox',
        // viewport: { width: 1920, height: 1080 },
        // launchOptions: {
        //   args: ['--start-maximized'],
        //   ignoreDefaultArgs: ['--window-size=1280,720']
        // }
      }
    },

    {
      name: 'Safari',
      use: {
        ...devices[ 'Desktop Safari' ],
        browserName: 'webkit',
        // viewport: { width: 1280, height: 720 },
        // launchOptions: {
        //   args: [ '--start-maximized' ],
        //   ignoreDefaultArgs: [ '--window-size=1280,720' ]
        // }
      }
    },

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
