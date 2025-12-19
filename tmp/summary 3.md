# Playwright Test Results

**Generated:** 2025-12-19T00:57:07.732Z

## 📊 Summary

| Status | Count |
|--------|-------|
| ✅ Passed | 12 |
| ❌ Failed | 16 |
| ⚠️  Flaky | 0 |
| ⏭️  Skipped | 0 |
| **📝 Total** | **28** |
| ⏱️  Duration | 557s |

**Pass Rate:** 42.9%

## ❌ Failed Tests (16)

### 1. flashcard-flow.spec.ts > Flashcard Learning Flow > should play audio when audio button is clicked

**File:** `flashcard-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /音声を聞く/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /音声を聞く/ })[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /音声を聞く/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /音声を聞く/ })[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /音声を聞く/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /音声を聞く/ })[22m

```

---

### 2. flashcard-flow.spec.ts > Flashcard Learning Flow > should show completion screen after learning all cards

**File:** `flashcard-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /もう一度復習/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /もう一度復習/ })[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /もう一度復習/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /もう一度復習/ })[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /もう一度復習/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /もう一度復習/ })[22m

```

---

### 3. flashcard-flow.spec.ts > Flashcard Learning Flow > should allow skipping cards with "まだ" button

**File:** `flashcard-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/d+ / d+/').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('text=/d+ / d+/').first()[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/d+ / d+/').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('text=/d+ / d+/').first()[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/d+ / d+/').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('text=/d+ / d+/').first()[22m

```

---

### 4. navigation.spec.ts > Navigation > should work correctly on mobile viewport

**File:** `navigation.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('#mobile-menu').getByRole('link', { name: /単語カード/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('#mobile-menu').getByRole('link', { name: /単語カード/ })[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('#mobile-menu').getByRole('link', { name: /単語カード/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('#mobile-menu').getByRole('link', { name: /単語カード/ })[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('#mobile-menu').getByRole('link', { name: /単語カード/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('#mobile-menu').getByRole('link', { name: /単語カード/ })[22m

```

---

### 5. navigation.spec.ts > Navigation > should navigate from tones to tone quiz

**File:** `navigation.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /クイズに挑戦/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /クイズに挑戦/ })[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /クイズに挑戦/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /クイズに挑戦/ })[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /クイズに挑戦/ })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByRole('button', { name: /クイズに挑戦/ })[22m

```

---

### 6. navigation.spec.ts > Navigation > should navigate from flashcard completion back to categories

**File:** `navigation.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /他のカテゴリーへ/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /他のカテゴリーへ/ })[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /他のカテゴリーへ/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /他のカテゴリーへ/ })[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /他のカテゴリーへ/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /他のカテゴリーへ/ })[22m

```

---

### 7. navigation.spec.ts > Navigation > should maintain progress when navigating between pages

**File:** `navigation.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/総経験値/').locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/総経験値/').locator('..').locator('.text-3xl').first()[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/総経験値/').locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/総経験値/').locator('..').locator('.text-3xl').first()[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/総経験値/').locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/総経験値/').locator('..').locator('.text-3xl').first()[22m

```

---

### 8. progress-tracking.spec.ts > Progress Tracking > should display initial user progress on home page

**File:** `progress-tracking.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/Lv\\.\\d+/')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/Lv\\.\\d+/')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/Lv\\.\\d+/')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/Lv\\.\\d+/')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/Lv\\.\\d+/')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/Lv\\.\\d+/')[22m

```

---

### 9. progress-tracking.spec.ts > Progress Tracking > should display progress statistics page

**File:** `progress-tracking.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

---

### 10. progress-tracking.spec.ts > Progress Tracking > should update streak when studying

**File:** `progress-tracking.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('連続学習日数').first().locator('..').locator('.text-3xl').first()[22m

```

---

### 11. progress-tracking.spec.ts > Progress Tracking > should display category progress with percentages

**File:** `progress-tracking.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('日常会話')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for getByText('日常会話')[22m

```

---

### 12. quiz-flow.spec.ts > Quiz Flow > should navigate to quiz and complete Japanese to Vietnamese quiz

**File:** `quiz-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

---

### 13. quiz-flow.spec.ts > Quiz Flow > should show correct XP earned after quiz completion

**File:** `quiz-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

---

### 14. quiz-flow.spec.ts > Quiz Flow > should show wrong answers section when mistakes are made

**File:** `quiz-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByText('クイズ完了！')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for getByText('クイズ完了！')[22m

```

---

### 15. quiz-flow.spec.ts > Quiz Flow > should navigate to Vietnamese to Japanese quiz

**File:** `quiz-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('.text-4xl.font-bold')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('.text-4xl.font-bold')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('.text-4xl.font-bold')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('.text-4xl.font-bold')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('.text-4xl.font-bold')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" with timeout 5000ms[22m
[2m  - waiting for locator('.text-4xl.font-bold')[22m

```

---

### 16. quiz-flow.spec.ts > Quiz Flow > should navigate to listening quiz

**File:** `quiz-flow.spec.ts`

**Attempt 1:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

**Attempt 2:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

**Attempt 3:** failed

**Error:**
```
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('text=/正解|不正解/')
Expected: visible
Error: strict mode violation: locator('text=/正解|不正解/') resolved to 2 elements:
    1) <p class="text-gray-600">4択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！</p> aka getByText('択クイズやリスニングで実力をチェックしましょう。正解するたびに経験値を獲得できます！')
    2) <span>正解するたびに +5 XP を獲得できます</span> aka getByText('正解するたびに +5 XP を獲得できます')

Call log:
[2m  - Expect "toBeVisible" with timeout 10000ms[22m
[2m  - waiting for locator('text=/正解|不正解/')[22m

```

---

## 💡 Recommendations

### Failed Tests
1. Review error messages above
2. Check if elements are loading in time
3. Verify selectors are correct
4. Consider increasing timeouts if needed

