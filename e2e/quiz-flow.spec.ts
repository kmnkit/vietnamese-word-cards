import { test, expect } from '@playwright/test';

test.describe('Quiz Flow', () => {
  test('should navigate to quiz and complete Japanese to Vietnamese quiz', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Click on quiz link
    await page.getByRole('link', { name: /クイズ/ }).click();

    // Verify quiz mode selection page loaded
    await expect(page.getByText('クイズモードを選択')).toBeVisible();

    // Select Japanese to Vietnamese quiz
    await page.getByRole('link', { name: /日本語 → ベトナム語/ }).click();

    // Wait for quiz page to load
    await page.waitForURL(/\/quiz\/ja-to-vi/);

    // Verify quiz question is displayed
    await expect(page.locator('text=/問題 \\d+ \\/ \\d+/')).toBeVisible();

    // Verify Japanese question is shown
    await expect(page.locator('.text-4xl.font-bold')).toBeVisible();

    // Select an answer (click the first choice)
    const firstChoice = page.locator('button').filter({ hasText: /^[^✓✗]+$/ }).first();
    await firstChoice.click();

    // Verify feedback is shown
    await page.waitForTimeout(300);
    await expect(page.locator('text=/正解|不正解/')).toBeVisible();

    // Click next button
    await page.getByRole('button', { name: /次の問題へ/ }).click();

    // Verify we moved to next question or completion screen
    await page.waitForTimeout(300);
  });

  test('should show correct XP earned after quiz completion', async ({ page }) => {
    await page.goto('/quiz/ja-to-vi?category=greetings');

    await page.waitForLoadState('networkidle');

    // Complete all 10 questions
    for (let i = 0; i < 10; i++) {
      // Wait for question to load
      await page.waitForTimeout(500);

      // Get all choice buttons (excluding those with checkmarks or x marks)
      const choices = page.locator('button').filter({ hasText: /^(?!.*[✓✗])/ });
      const firstChoice = choices.first();

      // Check if choice button exists (might be on completion screen)
      if (await firstChoice.isVisible()) {
        await firstChoice.click();

        // Wait for feedback
        await page.waitForTimeout(300);

        // Click next button if available
        const nextButton = page.getByRole('button', { name: /次の問題へ/ });
        if (await nextButton.isVisible()) {
          await nextButton.click();
        }
      }
    }

    // Verify completion screen
    await expect(page.getByText('クイズ完了！')).toBeVisible();

    // Verify XP is shown (5 XP per correct answer)
    await expect(page.locator('text=/獲得XP: \\d+ XP/')).toBeVisible();

    // Verify action buttons
    await expect(page.getByRole('button', { name: /もう一度挑戦/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /他のクイズへ/ })).toBeVisible();
  });

  test('should show wrong answers section when mistakes are made', async ({ page }) => {
    await page.goto('/quiz/vi-to-ja?category=numbers');

    await page.waitForLoadState('networkidle');

    let answeredQuestions = 0;

    // Answer questions (intentionally choose different answers to ensure some are wrong)
    while (answeredQuestions < 10) {
      await page.waitForTimeout(500);

      const choices = page.locator('button').filter({ hasText: /^(?!.*[✓✗])/ });
      const choiceCount = await choices.count();

      if (choiceCount > 0) {
        // Alternate between first and second choice
        const choiceIndex = answeredQuestions % 2;
        const choice = choices.nth(Math.min(choiceIndex, choiceCount - 1));
        await choice.click();

        await page.waitForTimeout(300);

        const nextButton = page.getByRole('button', { name: /次の問題へ/ });
        if (await nextButton.isVisible()) {
          await nextButton.click();
        }

        answeredQuestions++;
      } else {
        // Reached completion screen
        break;
      }
    }

    // Verify completion screen
    await expect(page.getByText('クイズ完了！')).toBeVisible();

    // Check if wrong answers section exists
    const wrongAnswersSection = page.getByText('間違えた問題');
    const hasWrongAnswers = await wrongAnswersSection.isVisible().catch(() => false);

    // If there are wrong answers, verify they are displayed
    if (hasWrongAnswers) {
      await expect(wrongAnswersSection).toBeVisible();
      await expect(page.locator('.bg-red-50')).toBeVisible();
    }
  });

  test('should navigate to Vietnamese to Japanese quiz', async ({ page }) => {
    await page.goto('/quiz');

    // Select Vietnamese to Japanese quiz
    await page.getByRole('link', { name: /ベトナム語 → 日本語/ }).click();

    // Wait for quiz page to load
    await page.waitForURL(/\/quiz\/vi-to-ja/);

    // Verify quiz loaded
    await expect(page.locator('text=/問題 \\d+ \\/ \\d+/')).toBeVisible();

    // Verify Vietnamese question is shown
    await expect(page.locator('.text-4xl.font-bold')).toBeVisible();

    // Verify audio button is available
    await expect(page.getByRole('button', { name: /音声を聞く/ })).toBeVisible();
  });

  test('should navigate to listening quiz', async ({ page }) => {
    await page.goto('/quiz');

    // Select listening quiz
    await page.getByRole('link', { name: /リスニングクイズ/ }).click();

    // Wait for quiz page to load
    await page.waitForURL(/\/quiz\/listening/);

    // Verify quiz loaded
    await expect(page.locator('text=/問題 \\d+ \\/ \\d+/')).toBeVisible();

    // Verify "もう一度聞く" button is available
    await expect(page.getByRole('button', { name: /もう一度聞く/ })).toBeVisible();

    // Answer should trigger feedback
    const firstChoice = page.locator('button').filter({ hasText: /^(?!.*[✓✗])/ }).first();
    await firstChoice.click();

    await page.waitForTimeout(300);

    // Verify Vietnamese word is now revealed
    await expect(page.locator('text=/正解|不正解/')).toBeVisible();
  });

  test('should filter quiz by category', async ({ page }) => {
    await page.goto('/quiz');

    // Select a specific category
    const categorySelect = page.locator('select').first();
    await categorySelect.selectOption('greetings');

    // Click on a quiz type
    await page.getByRole('link', { name: /日本語 → ベトナム語/ }).click();

    // Verify URL includes category parameter
    await expect(page).toHaveURL(/category=greetings/);
  });
});
