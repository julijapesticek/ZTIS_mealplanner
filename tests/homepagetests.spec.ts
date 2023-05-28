import { test, expect } from '@playwright/test';

test('has substring', async ({ page }) => {
    await page.goto('http://localhost:3001/homepage.html');
  
    const pageContent = await page.content();
    console.log('Page Content:', pageContent);
  
    await expect(page).toHaveTitle('Error');
  });



test('should display recipes', async ({ page }) => {
    await page.goto('http://localhost:3001/homepage.html');
  
    const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
    expect(recipeCardCount);
  });

//   test('should navigate to meal planner on day button click', async ({ page }) => {
//     await page.goto('http://localhost:3001/homepage.html');
  
//     const dayButton = await page.waitForSelector('.day-button');
//     const recipeName = await page.$eval('.recipe-card h3', (el) => el?.textContent || '');
  
//     const [newPage] = await Promise.all([
//       page.waitForEvent('popup'),
//       dayButton.click(),
//     ]);
  
//     const url = newPage.url();
//     expect(url).toContain('mealplan.html');
//     expect(url).toContain(`recipe=${encodeURIComponent(recipeName)}`);
//   });
  
// test('should perform search', async ({ page }) => {
//     await page.goto('http://localhost:3001/homepage.html');
  
//     const searchInput = await page.waitForSelector('#searchInput');
//     await searchInput.type('chicken');
//     const searchButton = await page.waitForSelector('#searchButton');
//     await searchButton.click();
  
//     // Wait for the search results to load
//     await page.waitForSelector('.recipe-card');
  
//     const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
//     expect(recipeCardCount);
//   });
  
//   test('should log out on button click', async ({ page }) => {
//     await page.goto('http://localhost:3001/homepage.html');
  
//     const logoutButton = await page.waitForSelector('#logoutButton');
//     await logoutButton.click();
//     const alertMessage = await page.waitForEvent('dialog');
//     await alertMessage.accept();
//     expect(page.url()).toContain('login.html');
//   });
  
