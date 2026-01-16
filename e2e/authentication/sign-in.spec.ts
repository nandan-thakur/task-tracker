// spec: specs/test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Sign In', async ({ page }) => {
    // 1. Navigate to the Task Tracker application
    await page.goto('http://localhost:3001/task-tracker/');

    // 2. Enter the username 'admin'
    await page.getByRole('textbox', { name: 'admin' }).fill('admin');

    // 3. Enter the password 'password'
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');

    // 4. Click the 'Sign In' button
    await page.getByRole('button', { name: 'Sign In' }).click();
  });
});