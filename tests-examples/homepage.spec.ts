import { test, expect, chromium, Browser, Page } from '@playwright/test';

describe('Homepage', () => {
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
    await page.goto('http://localhost:3001/homepage.html');
  });

  afterEach(async () => {
    await page.close();
  });

  test('has substring', async () => {
    await page.goto('http://localhost:3001/homepage.html');
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Recipes');
  });


  it('should display recipes', async () => {
    const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
    expect(recipeCardCount);
  });

  it('should navigate to meal planner on day button click', async () => {
    const dayButton = await page.waitForSelector('.day-button');
    const recipeName = await page.$eval('.recipe-card h3', (el) => el?.textContent || '');

    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      dayButton.click(),
    ]);

    const url = newPage.url();
    expect(url).toContain('mealplan.html');
    expect(url).toContain(`recipe=${encodeURIComponent(recipeName)}`);
  });

  it('should perform search', async () => {
    const searchInput = await page.waitForSelector('#searchInput');
    await searchInput.type('chicken');
    const searchButton = await page.waitForSelector('#searchButton');
    await searchButton.click();

    // Wait for the search results to load
    await page.waitForSelector('.recipe-card');

    const recipeCardCount = await page.$$eval('.recipe-card', (cards) => cards.length);
    expect(recipeCardCount);
  });

  it('should log out on button click', async () => {
    const logoutButton = await page.waitForSelector('#logoutButton');
    await logoutButton.click();
    const alertMessage = await page.waitForEvent('dialog');
    await alertMessage.accept();
    expect(page.url()).toContain('login.html');
  });
});
