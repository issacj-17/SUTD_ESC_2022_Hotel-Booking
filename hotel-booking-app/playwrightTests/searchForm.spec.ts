import { test, expect, chromium } from '@playwright/test';

test("Testing Search Form Success", async () => {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('http://localhost:3000/');
    
    await page.locator('#destination div:has-text("Enter Your Destination")').nth(1).click();
    await page.locator('input[role="combobox"]').fill('Venice');
    await page.locator('div[role="button"]:has-text("Zelarino, Mestre, Italy")').click();


    await page.locator('[data-testid="checkIn"]').fill('2022-08-16');
    await page.locator('[data-testid="checkOut"]').fill('2022-08-23');

    await page.locator('[data-testid="rooms"]').selectOption('1');
    await page.locator('[data-testid="adults"]').selectOption('2');
    await page.locator('[data-testid="children"]').selectOption('0');

    await page.locator('[data-testid="submitButton"]').click();

    await expect(page).toHaveURL("http://localhost:3000/searchResults?destination=GCZM&checkInDate=2022-08-16&checkOutDate=2022-08-23&rooms=1&adults=2&children=0")
});

test("Testing Search Form Fail", async () => {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto('http://localhost:3000/');

    // test for checkin within 3 days
    let nextDay =  new Date();
    nextDay.setDate(new Date().getDate() + 2);
    
    await page.locator('[data-testid="checkIn"]').fill(nextDay.toISOString().split('T')[0]);
    await page.locator('[data-testid="checkIn"]').evaluate(e => e.blur());

    await expect(page.locator('#checkInDateError')).toBeVisible();

    // test for checkin within 3 days
    await page.goto('http://localhost:3000/');

    nextDay.setDate(nextDay.getDate() + 1);

    await page.locator('[data-testid="checkOut"]').fill(nextDay.toISOString().split('T')[0]);
    await page.locator('[data-testid="checkOut"]').evaluate(e => e.blur());

    await expect(page.locator('#checkOutDateError')).toBeVisible();

    // test for checkout before checkin
    await page.goto('http://localhost:3000/');

    let date2 = new Date();
    date2.setDate(new Date().getDate() + 6);

    let date1 = new Date();
    date1.setDate(new Date().getDate() + 4);

    await page.locator('[data-testid="checkIn"]').fill(date2.toISOString().split('T')[0]);
    await page.locator('[data-testid="checkIn"]').evaluate(e => e.blur());

    await page.locator('[data-testid="checkOut"]').fill(date1.toISOString().split('T')[0]);
    await page.locator('[data-testid="checkOut"]').evaluate(e => e.blur());

    await expect(page.locator('#checkOutDateError')).toBeVisible();

    // Test for empty form
    await page.goto('http://localhost:3000/');

    await page.locator('[data-testid="submitButton"]').click();
    await page.locator('[data-testid="submitButton"]').click();
    await expect(page.locator('#checkInDateError')).toBeVisible();

    await page.locator('[data-testid="checkIn"]').fill(date1.toISOString().split('T')[0]);

    await page.locator('[data-testid="submitButton"]').click();
    await page.locator('[data-testid="submitButton"]').click();
    await expect(page.locator('#checkOutDateError')).toBeVisible();

    await page.locator('[data-testid="checkOut"]').fill(date2.toISOString().split('T')[0]);

    await page.locator('[data-testid="submitButton"]').click();
    await expect(page.locator('#destinationError')).toBeVisible();

    await page.locator('#destination div:has-text("Enter Your Destination")').nth(1).click();
    await page.locator('input[role="combobox"]').fill('Venice');
    await page.locator('div[role="button"]:has-text("Zelarino, Mestre, Italy")').click();

    await page.locator('[data-testid="submitButton"]').click();

    await expect(page).not.toHaveURL('http://localhost:3000/');

});