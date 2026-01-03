// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Edit Existing Task', async ({ page }) => {
    // 1. Create a task if none exists
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Original task title');
    await page.getByRole('combobox').selectOption(['medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Original description');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 2. Click edit button on a task
    await page.getByRole('button').nth(5).click();

    // 3. Modify task title, priority, or description
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Updated task title');
    await page.getByRole('combobox').selectOption(['high']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('Updated description with more details');

    // 4. Save changes
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 5. Verify task is updated in the list
    await expect(page.getByRole('heading', { name: 'Updated task title' })).toBeVisible();
    await expect(page.getByText('high')).toBeVisible();
    await expect(page.getByText('Updated description with more details')).toBeVisible();

    // 6. Verify original creation date is preserved
    await expect(page.getByText('Created: Jan 3, 2026')).toBeVisible();
  });
});