import { test, expect } from '@playwright/test';

test('has substring', async ({ page }) => {
    await page.goto('http://localhost:3001/mealplan.html');
  
    const pageContent = await page.content();
    console.log('Page Content:', pageContent);
  
    await expect(page).toHaveTitle('Error');
  });



test('should display recipes', async ({ page }) => {
    await page.goto('http://localhost:3001/mealplan.html');
  
    const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
    expect(recipeCardCount);
  });
