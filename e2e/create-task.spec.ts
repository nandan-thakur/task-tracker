// spec: specs/test-plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Task Management', () => {
  test('Create New Task', async ({ page }) => {
    // 1. Navigate to the application
    await page.goto('http://localhost:3001/task-tracker/');

    // 2. Click 'New Task' button to open form
    await page.getByRole('button', { name: 'New Task' }).click();

    // 3. Fill in task title, priority, due date, and description
    await page.getByRole('textbox', { name: 'e.g., Review Q3 Marketing Plan' }).fill('Test task for automation');
    await page.getByRole('combobox').selectOption(['high']);
    await page.getByRole('textbox', { name: 'Add details about this task...' }).fill('This is a test task created for automation testing purposes');

    // 4. Submit the form
    await page.getByRole('button', { name: 'Create Task' }).click();

    // 5. Verify task appears in the list
    await expect(page.getByRole('heading', { name: 'Test task for automation' })).toBeVisible();
    await expect(page.getByText('high')).toBeVisible();
    await expect(page.getByText('This is a test task created for automation testing purposes')).toBeVisible();

    // 6. Verify task statistics are updated
    await expect(page.getByText('Total: 1')).toBeVisible();
    await expect(page.getByText('Done: 0')).toBeVisible();
  });
});