import { test, expect } from '@playwright/test';

test('Get all the users registered', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the user is logged in by checking for the presence of the dashboard
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  // Navigate to the Users page
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
  await page.getByRole('menuitem', { name: 'Users' }).getByText('Users').click();

  const rows = page.getByRole('table').getByRole('row');

  const usernames: string[] = [];

  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const cell = rows.nth(i).getByRole('cell').nth(1);
    const username = await cell.textContent();

    if (username) {
      usernames.push(username);
    }
 
  }
  console.log(usernames);

});

test('Get all the Employee Name registered', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify that the user is logged in by checking for the presence of the dashboard
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  // Navigate to the Users page
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
  await page.getByRole('menuitem', { name: 'Users' }).getByText('Users').click();

  const rows = page.getByRole('table').getByRole('row');

  const employees: string[] = [];

  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const cell = rows.nth(i).getByRole('cell').nth(3);
    const employee = await cell.textContent();

    if (employee) {
      employees.push(employee);
    }
 
  }
  console.log(employees);
});

test('Select specific user for edition', async ({ page }) => {

    // const userForEdition = 'Admin'

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row');

    const usernames: string[] = [];

    const rowCount = await rows.count();

    for (let i = 1; i < rowCount; i++) {
      const cell = rows.nth(i).getByRole('cell').nth(1);
      const username = await cell.textContent();

      if (username) {
        usernames.push(username);
      }
  
    }
    console.log(usernames);
    
    const userForEdition = usernames[Math.floor(Math.random() * usernames.length)];
    console.log(userForEdition);

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })


    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
        .inputValue()

    expect(currentUsername).toEqual(userForEdition)

    expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
        .toHaveValue(currentUsername)
})




