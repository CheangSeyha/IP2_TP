import { test, expect } from '@playwright/test';

test('Sauce Demo homepage loads', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Locating elements using user-centric placeholder attributes
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Assert successful transition into inventory page
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: /login/i }).click();

  // Validate the explicit data-test error element behavior
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match any user in this service'
  );
});