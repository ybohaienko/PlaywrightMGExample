# Playwright-MG-example

### The example test project for UI testing using Playwright framework

## Prerequisites

* **node >= v21.1.0**;
* **npm >= 10.2.3**

## Use:

- setup project:

```
npm i -D @playwright/test && npx playwright install && npx playwright install-deps
```

- run GUI tests with all three browsers headlessly AND API tests

```
npx playwright test
```

## Reporting:

- Reports are automatically created in `<PROJECT_ROOT>/playwright-report` directory;
- The report opens automatically in case of test execution fail.
- To manually open the test report execute the following commend:

```
npx playwright show-report
```

## Parallelism and browsers:

- Currently, multi-browser support is disabled and only the Chromium is in use. To enable other browsers, uncomment the
  lines under the `  projects: [` property in the `playwright.config.ts` file (from here: 'config file').
- Chromium run executes in **headful** mode. To enable **headless** mode, change the `headless:` property for the
  Chromium browse to `true` in the config file.
- By default, cross-browser tests execution done concurrently and independently for each browser (project).
- Currently, test execution is happening simultaneously thanks to **parallelism** syntax.
