// spec: specs/test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Create a New Task', async ({ page }) => {
    // 1. Sign in as a valid user
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('textbox', { name: 'admin' }).fill('admin');
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Click the 'New Task' button
    await page.getByRole('button', { name: 'New Task' }).click();

    // 3. Enter a task title
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Complete project documentation');

    // 4. Select a priority level
    await page.getByRole('combobox').selectOption(['High']);

    // 5. Enter a due date
    await page.locator('input[name="dueDate"]').fill('2026-01-31');

    // 6. Enter a description
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Finish writing the documentation for the project');

    // 7. Click the 'Create Task' button
    await page.getByRole('button', { name: 'Create Task' }).click();
  });
});