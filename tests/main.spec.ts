import { test, expect } from "@playwright/test";

//dragging image to next and previous page
//double click and drag to resize
//coordinates of the image ? not sure on this one

//testing drag functonality
test("drag image to another page", async ({ page }) => {
  await page.goto("https://pdfproject.vercel.app/");
  //never wait for timeout in production
  // await page.waitForTimeout(1000);
  //get the image from the annotation layer , need to find a way to randomize the image selection
  const image = page
    .getByTestId("core__annotation-layer-1")
    .locator("#draggable");
  //handle error if image not found
  if (!image) {
    throw new Error("image not found");
  }
  //get the destination page
  const destinationPage = await page.getByTestId("core__annotation-layer-0");
  if (destinationPage) {
    //drag the image to the destination page
    await image.dragTo(destinationPage);
    //check if the image is in the destination page
    //may not be needed
    //expect image location to be in the destination page viewport
    await expect(image).toBeInViewport();
  }
});

//testing double click  to see state of image
test("double click image to see state change", async ({ page }) => {
  await page.goto("https://pdfproject.vercel.app/");
  const image = page
    .getByTestId("core__annotation-layer-1")
    .locator("#draggable");
  if (!image) {
    throw new Error("image not found");
  }
  //double click the image
  await image.dblclick();
  //by default the images are in the dragging state
  //expect class to be changed after double click.
  await expect(image).toHaveClass("resizable");
  //switch back to dragging state
  await image.dblclick();
  await expect(image).toHaveClass("draggable");
});
