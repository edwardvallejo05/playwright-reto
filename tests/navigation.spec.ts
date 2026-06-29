import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

test('Check left menu options', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin('Admin', 'admin123');

  // Verify that the user is logged in by checking for the presence of the dashboard
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  const leftMenuItems = await page.getByLabel('Sidepanel').getByRole('listitem');
  const currentMenuItemsCount = await leftMenuItems.count();
  console.log('CURRENT MENU ITEMS COUNT', currentMenuItemsCount);

  const currentMenuItems: string[] = [];

  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuText = await leftMenuItems.nth(i).innerText();
    currentMenuItems.push(menuText);
  }

  console.log(currentMenuItems);

  const expectedMenuItems = [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz'
  ]

  expect(currentMenuItems).toEqual(expectedMenuItems);
  const firstItem = leftMenuItems.first();
  await expect(firstItem).toHaveText('Admin');

});

test('Navigate thought he left panel', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.doLogin('Admin', 'admin123');

  // Verify that the user is logged in by checking for the presence of the dashboard
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  const leftMenuItems = await page.getByLabel('Sidepanel').getByRole('listitem');
  const currentMenuItemsCount = await leftMenuItems.count();

  for (let i = 0; i < currentMenuItemsCount; i++) {
    const menuItem = leftMenuItems.nth(i);
    const menuText = await menuItem.innerText();

    console.log('Current menu item', menuText);
    if (menuText === 'Maintenance') {
      await menuItem.click();
      await page.goBack();
    } else {
      await menuItem.click();
      await page.waitForLoadState('networkidle')

    }
  }


})

test('Check all the qualification links', async ({ page }) => {

  const expectedPages = [
    {
      menu: 'Skills',
      url: '/web/index.php/admin/viewSkills'
    },
    {
      menu: 'Education',
      url: '/web/index.php/admin/viewEducation'
    },
    {
      menu: 'Licenses',
      url: '/web/index.php/admin/viewLicenses'
    },

  ]

  const loginPage = new LoginPage(page);
  await loginPage.doLogin('Admin', 'admin123');

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

  await page.getByRole('link', { name: 'Admin' }).click();

  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

  const qualificationOptions = page.getByRole('menu').locator('li')

  for (let expectedPage of expectedPages) {

    const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
    await menuOption.click()
    await expect(page).toHaveURL(new RegExp(expectedPage.url))

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

  }
})

test('Check all the Job links', async ({ page }) => {

  const expectedPages = [
    {
      menu: 'Job Titles',
      url: '/web/index.php/admin/viewJobTitleList'
    },
    {
      menu: 'Pay Grades',
      url: '/web/index.php/admin/viewPayGrades'
    },
    {
      menu: 'Employment Status',
      url: '/web/index.php/admin/employmentStatus'
    },

  ]

  const loginPage = new LoginPage(page);
  await loginPage.doLogin('Admin', 'admin123');

  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

  await page.getByRole('link', { name: 'Admin' }).click();

  await page.waitForLoadState('networkidle')

  await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()

  const JobOptions = page.getByRole('menu').locator('li')

  for (let expectedPage of expectedPages) {

    const menuOption = JobOptions.filter({ hasText: expectedPage.menu })
    await menuOption.click()
    await expect(page).toHaveURL(new RegExp(expectedPage.url))

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job').click()

  }
})