import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});

// Challenge A
test('login fails with locked out user error', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: /login/i }).click();

    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Sorry, this user has been locked out.');
});


// Challenge C
test('successful logout from dashboard menu', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /open menu/i }).click();

  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});