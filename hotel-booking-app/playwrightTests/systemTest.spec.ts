import { test, expect, chromium } from '@playwright/test';

test('Full System Test', async () => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext({
    // recordVideo: {
    //     dir: "./videos/"
    // }
  })
  const page = await context.newPage();
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');
  // Click #destination div:has-text("Enter Your Destination") >> nth=1
  await page.locator('#destination div:has-text("Enter Your Destination")').nth(1).click();
  // Fill input[role="combobox"]
  await page.locator('input[role="combobox"]').fill('Venice');
  // Click div[role="button"]:has-text("Salute Waterbus, Venice, Italy")
  await page.locator('div[role="button"]:has-text("Salute Waterbus, Venice, Italy")').click();


  let date2 = new Date();
  date2.setDate(new Date().getDate() + 6);

  let date1 = new Date();
  date1.setDate(new Date().getDate() + 4);

  let date1ISO = date1.toISOString().split('T')[0];
  let date2ISO = date2.toISOString().split('T')[0];





  // Fill [data-testid="checkIn"]
  await page.locator('[data-testid="checkIn"]').fill(date1ISO);
  // Fill [data-testid="checkOut"]
  await page.locator('[data-testid="checkOut"]').fill(date2ISO);
  // Select 2
  await page.locator('[data-testid="rooms"]').selectOption('2');
  // Select 2
  await page.locator('[data-testid="children"]').selectOption('2');
  // Click [data-testid="submitButton"]
  await page.locator('[data-testid="submitButton"]').click();
  await expect(page).toHaveURL(`http://localhost:3000/searchResults?destination=AqIc&checkInDate=${date1ISO}&checkOutDate=${date2ISO}&rooms=2&adults=2&children=2`);
  // Click text=SGD 8782.99Select >> [data-testid="selectButton"]
  await page.locator('[id="zs4j"]').click();
  await expect(page).toHaveURL(`http://localhost:3000/hotelDetails?hotelId=pvlB&destination=AqIc&checkInDate=${date1ISO}&checkOutDate=${date2ISO}&rooms=2&adults=2&children=2&guestQuery=4%7C4`);
  // Click text=Price of Junior Suite Capacity 4 is : 6316.44Select >> button
  await page.locator('id=').click(); 
  await expect(page).toHaveURL(`http://localhost:3000/bookingPage?roomType=Junior+Suite+Capacity+4&price=6316.44&hotelId=pvlB&destination=AqIc&checkInDate=${date1ISO}&checkOutDate=${date2ISO}&rooms=2&adults=2&children=2`);
  // Click [data-testid="firstName"]
  await page.locator('[data-testid="firstName"]').click();
  // Fill [data-testid="firstName"]
  await page.locator('[data-testid="firstName"]').fill('Hayden');
  // Press Tab
  await page.locator('[data-testid="firstName"]').press('Tab');
  // Fill [data-testid="lastName"]
  await page.locator('[data-testid="lastName"]').fill('Ang');
  // Press Tab
  await page.locator('[data-testid="lastName"]').press('Tab');
  // Fill [data-testid="phoneNumber"]
  await page.locator('[data-testid="phoneNumber"]').fill('92723483');
  // Click [data-testid="email"]
  await page.locator('[data-testid="email"]').click();
  // Fill [data-testid="email"]
  await page.locator('[data-testid="email"]').fill('hayhay@gmail.com');
  // Click [data-testid="specialRequest"]
  await page.locator('[data-testid="specialRequest"]').click();
  // Fill [data-testid="specialRequest"]
  await page.locator('[data-testid="specialRequest"]').fill('Nil');
  // Click [data-testid="bankCard"]
  await page.locator('[data-testid="bankCard"]').click();
  // Fill [data-testid="bankCard"]
  await page.locator('[data-testid="bankCard"]').fill('5555555555554444');
  // Click [data-testid="expiryDate"]
  await page.locator('[data-testid="expiryDate"]').click();
  // Fill [data-testid="expiryDate"]
  await page.locator('[data-testid="expiryDate"]').fill('03/26');
  // Press Tab
  await page.locator('[data-testid="expiryDate"]').press('Tab');
  // Fill [data-testid="CVV"]
  await page.locator('[data-testid="CVV"]').fill('948');
  // Click [data-testid="billingAddress"]
  await page.locator('[data-testid="billingAddress"]').click();
  // Fill [data-testid="billingAddress"]
  await page.locator('[data-testid="billingAddress"]').fill('SUTD');
  // Click text=Submit
  await page.locator('text=Submit').click();
  // Click text=Hayden Ang
  await page.locator('text=Hayden Ang').click();
  // Click text=92723483
  await page.locator('text=92723483').click();
  // Click text=hayhay@gmail.com
  await page.locator('text=hayhay@gmail.com').click();
  // Click text=Nil
  await page.locator('text=Nil').click();
  // Click text=SUTD
  await page.locator('text=SUTD').click();
  // Click text=Book Next Room
  await page.locator('text=Book Next Room').click();
  await expect(page).toHaveURL('http://localhost:3000/hotelDetails?hotelId=pvlB&destination=AqIc&checkInDate=2022-08-10&checkOutDate=2022-08-18&rooms=1&adults=2&children=2&guestQuery=4');
  // Click text=Price of Junior Suite Capacity 4 is : 3509.15Select >> button
  await page.locator('text=Price of Junior Suite Capacity 4 is : 3509.15Select >> button').click();
  // Click [data-testid="firstName"]
  await page.locator('[data-testid="firstName"]').click();
  // Fill [data-testid="firstName"]
  await page.locator('[data-testid="firstName"]').fill('Hayden');
  // Press Tab
  await page.locator('[data-testid="firstName"]').press('Tab');
  // Fill [data-testid="lastName"]
  await page.locator('[data-testid="lastName"]').fill('Ang');
  // Press Tab
  await page.locator('[data-testid="lastName"]').press('Tab');
  // Fill [data-testid="phoneNumber"]
  await page.locator('[data-testid="phoneNumber"]').fill('92723483');
  // Click [data-testid="email"]
  await page.locator('[data-testid="email"]').click();
  // Fill [data-testid="email"]
  await page.locator('[data-testid="email"]').fill('hayhay@gmail.com');
  // Click [data-testid="specialRequest"]
  await page.locator('[data-testid="specialRequest"]').click();
  // Fill [data-testid="specialRequest"]
  await page.locator('[data-testid="specialRequest"]').fill('Nil');
  // Click [data-testid="bankCard"]
  await page.locator('[data-testid="bankCard"]').click();
  // Fill [data-testid="bankCard"]
  await page.locator('[data-testid="bankCard"]').fill('5555555555554444');
  // Click [data-testid="expiryDate"]
  await page.locator('[data-testid="expiryDate"]').click();
  // Fill [data-testid="expiryDate"]
  await page.locator('[data-testid="expiryDate"]').fill('03/26');
  // Click [data-testid="CVV"]
  await page.locator('[data-testid="CVV"]').click();
  // Fill [data-testid="CVV"]
  await page.locator('[data-testid="CVV"]').fill('948');
  // Click [data-testid="billingAddress"]
  await page.locator('[data-testid="billingAddress"]').click();
  // Fill [data-testid="billingAddress"]
  await page.locator('[data-testid="billingAddress"]').fill('SUTD');
  // Click text=Submit
  await page.locator('text=Submit').click();
  
  // Click text=Hayden Ang
  await page.locator('text=Hayden Ang').click();
  // Click text=92723483
  await page.locator('text=92723483').click();
  // Click text=hayhay@gmail.com
  await page.locator('text=hayhay@gmail.com').click();
  // Click text=Nil
  await page.locator('text=Nil').click();
  // Click text=SUTD
  await page.locator('text=SUTD').click();
  // Click text=Go Back Home
  await page.locator('text=Go Back Home').click();
  await expect(page).toHaveURL('http://localhost:3000/');
  
  //Wait awhile for video completion
  await page.waitForTimeout(1000)
  await context.close();
});