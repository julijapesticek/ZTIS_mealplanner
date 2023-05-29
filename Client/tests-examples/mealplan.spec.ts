import { test, expect, chromium, Browser, Page } from '@playwright/test';

describe('Meal Planner', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3001/mealplan.html');
  });

  afterEach(async () => {
    await page.close();
  });

  test('has substring', async () => {
    await page.goto('http://localhost:3001/mealplan.html');
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Recipes');
  });

  it('should display recipes', async () => {
    const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
    expect(recipeCardCount);
  });
});