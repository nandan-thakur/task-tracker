// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Delete Task', async ({ page }) => {
    // 1. Create a task if none exists
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Task to delete');
    await page.getByRole('combobox').selectOption(['low']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('This task will be deleted for testing');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 2. Click delete button on a task
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();

    // 3. Confirm deletion in dialog
    await page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Are you sure you want to delete this task?');
      await dialog.accept();
    });

    // 4. Verify task is removed from list
    await expect(page.getByRole('heading', { name: 'Task to delete' })).not.toBeVisible();
    await expect(page.getByText('This task will be deleted for testing')).not.toBeVisible();

    // 5. Verify statistics are updated
    await expect(page.getByText('Total: 0')).toBeVisible();
    await expect(page.getByText('Done: 0')).toBeVisible();
  });
});