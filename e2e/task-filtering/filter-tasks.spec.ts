// spec: specs/test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Filtering', () => {
  test('Filter Tasks by Status', async ({ page }) => {
    // 1. Sign in as a valid user
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('textbox', { name: 'admin' }).fill('admin');
    await page.getByRole('textbox', { name: '••••••••' }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Create multiple tasks with different statuses
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Complete project documentation');
    await page.getByRole('combobox').selectOption(['High']);
    await page.locator('input[name="dueDate"]').fill('2026-01-31');
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Finish writing the documentation for the project');
    await page.getByRole('button', { name: 'Create Task' }).click();

    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Review project plan');
    await page.locator('input[name="dueDate"]').fill('2026-01-25');
    await page.getByRole('combobox').selectOption(['Medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Review the project plan and provide feedback');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 3. Click the checkbox to mark the task as completed
    await page.getByRole('button').nth(5).click();

    // 4. Click the 'all' button to view all tasks
    await page.getByRole('button', { name: 'all' }).click();

    // 5. Click the 'active' button to view only active tasks
    await page.getByRole('button', { name: 'active' }).click();

    // 6. Click the 'completed' button to view only completed tasks
    await page.getByRole('button', { name: 'completed' }).click();
  });
});