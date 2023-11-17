# Playwright-MG-example

### The example test project for UI testing using Playwright framework

## Prerequisites

* **node >= v21.1.0**;
* **npm >= 10.2.3**

## Use:

- to setup project:

```
npm install && npx playwright install chromium
```

- to run GUI tests:

```
npx playwright test
```

- to remove installed browser(s), run:

```
npx playwright unnstall
```

## Reporting:

- Reports are automatically created in `<PROJECT_ROOT>/playwright-report` directory;
- The report opens automatically in case of test execution fail.
- To manually open the test report execute the following commend:

```
npx playwright show-report
```

## Parallelism and browsers:

- Currently, multi-browser support is disabled, and only the Chromium is in use. To enable other browsers, uncomment the
  lines under the `  projects: [` property in the `playwright.config.ts` file (from here: 'config file') and run:

```
npx playwright install
```

- Chromium run executes in **heedful** mode. To enable **headless** mode, change the `headless:` property for the
  Chromium browse to `true` in the config file.
- By default, cross-browser tests execution is concurrent and independent for each browser (project).
- Currently, the test execution happens simultaneously thanks to **parallelism** syntax.

## Prioritization and coverage:

- Within the code, there are additional comments about the execution details of the test scenarios.
- Some test scenarios have no implementation and are specified only to demonstrate cases to cover
- Test cases that needed priority or order during the execution put into the `test.describe.serial` block. This
  approach allows to run them sequentially, so one failed test case will trigger the skipping of others to save time during
  the execution.