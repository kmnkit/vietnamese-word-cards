import { test, expect } from '@playwright/test';

test.describe('Flashcard Learning Flow', () => {
  test('should navigate to flashcard category and complete a learning session', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Verify home page loaded
    await expect(page.getByText('ベトナム語学習アプリ')).toBeVisible();

    // Click on flashcards link
    await page.getByRole('link', { name: /単語カード/ }).click();

    // Verify flashcard category page loaded
    await expect(page.getByText('カテゴリーを選択')).toBeVisible();

    // Click on a category (e.g., Greetings)
    const categoryCard = page.locator('text=挨拶').first();
    await categoryCard.click();

    // Wait for flashcard page to load
    await page.waitForURL(/\/flashcards\/greetings/);

    // Verify flashcard is displayed
    await expect(page.locator('text=ベトナム語')).toBeVisible();

    // Click the card to flip it
    const flashcard = page.locator('.cursor-pointer').first();
    await flashcard.click();

    // Wait for flip animation
    await page.waitForTimeout(600);

    // Verify back side is shown (Japanese text should be visible)
    await expect(page.locator('text=日本語')).toBeVisible();

    // Click "覚えた" button
    await page.getByRole('button', { name: /覚えた/ }).click();

    // Verify progress updated
    await expect(page.locator('text=/覚えた: [1-9]/')).toBeVisible();

    // Complete all cards or skip to completion
    // For testing purposes, we'll just verify the flow works
  });

  test('should play audio when audio button is clicked', async ({ page }) => {
    await page.goto('/flashcards/greetings');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Find and click audio button
    const audioButton = page.getByRole('button', { name: /音声を聞く/ });
    await expect(audioButton).toBeVisible();

    // Click audio button (note: audio playback itself can't be verified in E2E)
    await audioButton.click();

    // Verify no errors occurred
    await expect(audioButton).toBeVisible();
  });

  test('should show completion screen after learning all cards', async ({ page }) => {
    await page.goto('/flashcards/greetings');

    // Wait for flashcards to load
    await page.waitForLoadState('networkidle');

    // Get total number of cards from progress indicator
    const progressText = await page.locator('text=/\\d+ \\/ \\d+/').first().textContent();
    const totalCards = parseInt(progressText?.split('/')[1]?.trim() || '0');

    // Mark all cards as learned
    for (let i = 0; i < totalCards; i++) {
      // Wait for card to be visible
      await page.waitForTimeout(300);

      // Click "覚えた" button
      const knowButton = page.getByRole('button', { name: /覚えた/ });
      if (await knowButton.isVisible()) {
        await knowButton.click();
      }
    }

    // Verify completion screen is shown
    await expect(page.getByText('素晴らしい！完了しました')).toBeVisible();
    await expect(page.getByText('覚えた単語')).toBeVisible();
    await expect(page.getByText('獲得XP')).toBeVisible();

    // Verify action buttons are available
    await expect(page.getByRole('button', { name: /もう一度復習/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /他のカテゴリーへ/ })).toBeVisible();
  });

  test('should allow skipping cards with "まだ" button', async ({ page }) => {
    await page.goto('/flashcards/greetings');

    await page.waitForLoadState('networkidle');

    // Click "まだ" button to skip
    const skipButton = page.getByRole('button', { name: /まだ/ });
    await expect(skipButton).toBeVisible();
    await skipButton.click();

    // Verify we moved to next card (progress should update)
    await page.waitForTimeout(300);

    // Verify card is still visible (not on completion screen)
    await expect(page.locator('text=ベトナム語')).toBeVisible();
  });
});
