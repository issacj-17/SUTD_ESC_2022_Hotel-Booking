import { test, expect, chromium } from '@playwright/test';

test('Full System Test', async () => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext({
    recordVideo: {
        dir: "./videos/"
    }
  })
  const page = await context.newPage();
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click #destination div:has-text("Enter Your Destination") >> nth=1
  await page.locator('#destination div:has-text("Enter Your Destination")').nth(1).click();

  // Fill input[role="combobox"]
  await page.locator('input[role="combobox"]').fill('Oslo');

  // Click div[role="button"]:has-text("Norwegian Customs Museum, Oslo, Norway")
  await page.locator('div[role="button"]:has-text("Norwegian Customs Museum, Oslo, Norway")').click();

  // Fill [data-testid="checkIn"]
  await page.locator('[data-testid="checkIn"]').fill('2022-08-16');

  // Fill [data-testid="checkOut"]
  await page.locator('[data-testid="checkOut"]').fill('2022-08-23');

  // Select 2
  await page.locator('[data-testid="rooms"]').selectOption('2');

  // Select 2
  await page.locator('[data-testid="children"]').selectOption('2');

  // Click [data-testid="submitButton"]
  await page.locator('[data-testid="submitButton"]').click();
  await expect(page).toHaveURL('http://localhost:3000/searchResults?destination=iqrC&checkInDate=2022-08-16&checkOutDate=2022-08-23&rooms=2&adults=2&children=2');

  // Click text=Clarion Collection Hotel BastionSkippergata 7Rated 83/100Rooms from SGD $$.$$Sel >> [data-testid="selectButton"]
  await page.locator('text=Clarion Collection Hotel BastionSkippergata 7Rated 83/100Rooms from SGD $$.$$Sel >> [data-testid="selectButton"]').click();
  await expect(page).toHaveURL('http://localhost:3000/hotelDetails?hotelId=3vax&destination=iqrC&checkInDate=2022-08-16&checkOutDate=2022-08-23&rooms=2&adults=2&children=2');
  // Click [data-testid="hotelName"]
  await page.locator('[data-testid="hotelName"]').click();
  // Click .carousel-inner > .active >> nth=0
  await page.locator('.carousel-inner > .active').first().click();
  // Click text=Description
  await page.locator('text=Description').click();
  // Click [data-testid="location"]
  await page.locator('[data-testid="location"]').click();
  // Click text=Price of Double Or Standard Twin is : 2819.34Select >> button
  await page.locator('text=Price of Double Or Standard Twin is : 2819.34Select >> button').click();
  await expect(page).toHaveURL('http://localhost:3000/bookingPage?roomType=Double+Or+Standard+Twin&price=2819.34&hotelId=3vax&destination=iqrC&checkInDate=2022-08-16&checkOutDate=2022-08-23&rooms=2&adults=2&children=2');
  
  // Click [placeholder="First Name"]
  await page.locator('[placeholder="First Name"]').click();
  // Fill [placeholder="First Name"]
  await page.locator('[placeholder="First Name"]').fill('Hayden ');
  // Press Tab
  await page.locator('[placeholder="First Name"]').press('Tab');
  // Fill [placeholder="Last Name"]
  await page.locator('[placeholder="Last Name"]').fill('Ang');
  // Press Tab
  await page.locator('[placeholder="Last Name"]').press('Tab');
  // Fill [placeholder="Phone Number"]
  await page.locator('[placeholder="Phone Number"]').fill('91583124');
  // Press Tab
  await page.locator('[placeholder="Phone Number"]').press('Tab');
  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill('haydenang@gmail.com');
  // Click [placeholder="Special Request"]
  await page.locator('[placeholder="Special Request"]').click();
  // Fill [placeholder="Special Request"]
  await page.locator('[placeholder="Special Request"]').fill('Nil');
  
  //Wait awhile for video completion
  await page.waitForTimeout(1000)
  await context.close();
});