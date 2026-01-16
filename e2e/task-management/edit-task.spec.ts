// spec: specs/test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Edit a Task', async ({ page }) => {
    // 1. Sign in as a valid user
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('textbox', { name: 'admin' }).fill('admin');
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Create a task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Complete project documentation');
    await page.locator('input[name="dueDate"]').fill('2026-01-31');
    await page.getByRole('combobox').selectOption(['High']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Finish writing the documentation for the project');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 3. Click the 'Edit' button on the task
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();

    // 4. Update the task title
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Updated task title');

    // 5. Click the 'Save' button
    await page.getByRole('button', { name: 'Save Changes' }).click();
  });
});