// spec: specs/test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('Sign Out', async ({ page }) => {
    // 1. Sign in as a valid user
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('textbox', { name: 'admin' }).fill('admin');
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Click the 'Sign Out' button
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

    // 3. Confirm the sign out action
    await page.getByRole('button', { name: 'Confirm' }).click();
  });
});