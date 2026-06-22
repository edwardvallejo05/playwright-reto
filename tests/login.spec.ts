import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('Login to hrm', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that the user is logged in by checking for the presence of the dashboard
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('InvalidUser');
    await page.getByRole('textbox', { name: 'Password' }).fill('InvalidPass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that an error message is displayed
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });



});
