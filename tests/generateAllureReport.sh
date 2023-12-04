npx playwright test --reporter=allure-playwright
npx allure generate ./allure-results --clean
npx allure open ./allure-report