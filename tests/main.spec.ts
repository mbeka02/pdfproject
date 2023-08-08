import { test, expect } from "@playwright/test";

//dragging image to next and previous page
//double click and drag to resize
//coordinates of the image ? not sure on this one

//work in progress
//seems to be working fine but the image clipping behind the page issue is still there
test("test", async ({ page }) => {
  await page.goto("https://pdfproject.vercel.app/");
  //never wait for timeout in production
  // await page.waitForTimeout(1000);
  //get the image
  const image = page
    .getByTestId("core__annotation-layer-1")
    .locator("#draggable");
  //drag the image to the previous page annotation layer
  const destinationPage = page.getByTestId("core__annotation-layer-0");
  if (destinationPage) {
    //could be more specific
    await image.dragTo(destinationPage);
  }
  //double click the image

  //await page.getByTestId('core__annotation-layer-0').locator('#draggable').dblclick();
});
