// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Data Persistence', () => {
  test('Local Storage Persistence', async ({ page }) => {
    // 1. Create multiple tasks
    await page.goto('http://localhost:3001/task-tracker/');
    
    // Create first task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Persisted task 1');
    await page.getByRole('combobox').selectOption(['high']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('First task for persistence testing');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Create second task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Persisted task 2');
    await page.getByRole('combobox').selectOption(['medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Second task for persistence testing');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 2. Refresh the browser page
    await page.goto('http://localhost:3001/task-tracker/');

    // 3. Verify all tasks are preserved
    await expect(page.getByRole('heading', { name: 'Persisted task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Persisted task 2' })).toBeVisible();
    await expect(page.getByText('Total: 2')).toBeVisible();

    // 4. Edit a task
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Updated persisted task 1');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 5. Refresh page
    await page.goto('http://localhost:3001/task-tracker/');

    // 6. Verify changes persist
    await expect(page.getByRole('heading', { name: 'Updated persisted task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Persisted task 2' })).toBeVisible();

    // 7. Delete a task
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
    await page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });

    // 8. Refresh page
    await page.goto('http://localhost:3001/task-tracker/');

    // 9. Verify deletion is permanent
    await expect(page.getByRole('heading', { name: 'Updated persisted task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Persisted task 2' })).not.toBeVisible();
    await expect(page.getByText('Total: 1')).toBeVisible();
  });
});