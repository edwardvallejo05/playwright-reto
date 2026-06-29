import { test, expect } from '@playwright/test'

test('Check left menu options', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

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
        }else{
            await menuItem.click();
        }
    }


})