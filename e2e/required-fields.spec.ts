// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Form Validation', () => {
  test('Required Field Validation', async ({ page }) => {
    // 1. Click 'New Task' to open form
    await page.goto('http://localhost:3001');
    await page.getByRole('button', { name: 'New Task' }).click();

    // 2. Leave title field empty
    // 3. Submit form
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 4. Verify validation error or prevention
    // Note: The application prevents submission without title, so we verify the form remains open
    await expect(page.getByRole('heading', { name: 'Create New Task' })).toBeVisible();

    // 5. Fill title and submit
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Valid task title');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 6. Verify task creation succeeds
    await expect(page.getByRole('heading', { name: 'Valid task title' })).toBeVisible();
    await expect(page.getByText('Total: 1')).toBeVisible();
  });
});