// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Filtering and Search', () => {
  test('Search Functionality', async ({ page }) => {
    // 1. Create tasks with different titles and descriptions
    await page.goto('http://localhost:3001/task-tracker/');
    
    // Create first task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Documentation task');
    await page.getByRole('combobox').selectOption(['high']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Write documentation for the project');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Create second task
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Code review task');
    await page.getByRole('combobox').selectOption(['medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Review the latest pull request code changes');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 2. Enter search term in search box
    await page.getByRole('textbox', { name: 'Search tasks...' }).fill('doc');

    // 3. Verify only matching tasks are shown
    await expect(page.getByRole('heading', { name: 'Documentation task' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Code review task' })).not.toBeVisible();

    // 4. Test case-insensitive search
    await page.getByRole('textbox', { name: 'Search tasks...' }).fill('DOC');
    await expect(page.getByRole('heading', { name: 'Documentation task' })).toBeVisible();

    // 5. Test partial word matching
    await page.getByRole('textbox', { name: 'Search tasks...' }).fill('review');
    await expect(page.getByRole('heading', { name: 'Code review task' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Documentation task' })).not.toBeVisible();

    // 6. Clear search to show all tasks
    await page.getByRole('textbox', { name: 'Search tasks...' }).fill('');
    await expect(page.getByRole('heading', { name: 'Documentation task' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Code review task' })).toBeVisible();
  });
});