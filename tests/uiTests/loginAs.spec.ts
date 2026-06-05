import { test, expect } from '@playwright/test';
 
test('Admin creates notification and user sees it', async ({ browser }) => {
 
    // Admin session
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
 
    // User session
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
 
    // Login as Admin
    await adminPage.goto('/admin/login');
    await adminPage.fill('#email', 'admin@test.com');
    await adminPage.fill('#password', 'password');
    await adminPage.click('button[type="submit"]');
 
    // Login as User
    await userPage.goto('/login');
    await userPage.fill('#email', 'user@test.com');
    await userPage.fill('#password', 'password');
    await userPage.click('button[type="submit"]');
 
    // Admin creates notification
    await adminPage.goto('/admin/notifications');
    await adminPage.click('text=Create Notification');
 
    const notificationText = `Test Notification ${Date.now()}`;
 
    await adminPage.fill('#message', notificationText);
    await adminPage.click('text=Save');
 
    // User refreshes page
    await userPage.reload();
 
    await expect(
        userPage.locator(`text=${notificationText}`)
    ).toBeVisible();
 
    await adminContext.close();
    await userContext.close();
});