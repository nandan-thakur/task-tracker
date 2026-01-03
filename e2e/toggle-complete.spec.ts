// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Mark Task Complete/Incomplete', async ({ page }) => {
    // 1. Create a task if none exists
    await page.goto('http://localhost:3001/task-tracker/');
    await page.getByRole('button', { name: 'New Task' }).click();
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Task for completion testing');
    await page.getByRole('combobox').selectOption(['medium']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('This task will be used to test completion functionality');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 2. Click checkbox to mark task complete
    await page.getByRole('button').nth(4).click();

    // 3. Verify visual changes (strikethrough, grayed out)
    await expect(page.getByText('Done: 1')).toBeVisible();
    await expect(page.getByRole('button').nth(4)).toBeVisible();

    // 4. Click checkbox again to mark incomplete
    await page.getByRole('button').nth(4).click();

    // 5. Verify visual changes revert
    await expect(page.getByText('Done: 0')).toBeVisible();
    await expect(page.getByRole('button').nth(4)).toBeVisible();
  });
});