// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering and Search', () => {
  test('Filter by Status', async ({ page }) => {
    // 1. Create multiple tasks with different completion states
    await page.goto('http://localhost:3001/task-tracker/');
    
    // Create first active task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Active task 1');
    await page.getByRole('combobox').selectOption(['high']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('First active task for testing');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Create second task and mark it as completed
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Completed task 1');
    await page.getByRole('combobox').selectOption(['medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Second task that will be completed');
    await page.getByRole('button', { name: 'Create Task' }).click();
    
    // Mark second task as completed
    await page.getByRole('button').nth(4).click();

    // 2. Click 'active' filter
    await page.getByRole('button', { name: 'active' }).click();

    // 3. Verify only incomplete tasks are shown
    await expect(page.getByRole('heading', { name: 'Active task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Completed task 1' })).not.toBeVisible();

    // 4. Click 'completed' filter
    await page.getByRole('button', { name: 'completed' }).click();

    // 5. Verify only completed tasks are shown
    await expect(page.getByRole('heading', { name: 'Completed task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Active task 1' })).not.toBeVisible();

    // 6. Click 'all' filter
    await page.getByRole('button', { name: 'all' }).click();

    // 7. Verify all tasks are shown
    await expect(page.getByRole('heading', { name: 'Active task 1' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Completed task 1' })).toBeVisible();
  });
});