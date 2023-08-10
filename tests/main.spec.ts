import { test, expect } from "@playwright/test";

//provide the url of the pdf viewer
test.beforeEach(async ({ page }) => {
  await page.goto("https://pdfproject.vercel.app/");
});

//define type
type imageSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

//dragging image to next and previous page
//double click and drag to resize
//coordinates of the image ? not sure on this one

test.describe("dragging", () => {
  //testing drag functonality between pages
  test("drag image to another page", async ({ page }) => {
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
});

//testing double click  to see state of image
test.describe("image state changing between dragging and resizing", () => {
  test("double click image to see state change", async ({ page }) => {
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
});

//testing resizing of image
test.describe("resizing", () => {
  test("resize image", async ({ page }) => {
    const image = page
      .getByTestId("core__annotation-layer-1")
      .locator("#draggable");
    if (!image) {
      throw new Error("image not found");
    }
    //get page bouding box and move image to the center of the page

    //move image to the center of the page);

    //double click the image to change state to resizable
    await image.dblclick();
    //expect class to be changed after double click.
    await expect(image).toHaveClass("resizable"), { timeout: 10000 };
    //get image size before resizing
    const imageSizeBefore = (await image.boundingBox()) as imageSize;

    //place mouse at the center of the image
    const centerX = imageSizeBefore.x + imageSizeBefore.width / 2;
    const centerY = imageSizeBefore.y + imageSizeBefore.height / 2;
    await page.mouse.move(centerX, centerY);
    await page.mouse.down();

    await page.mouse.move(centerX + 10, centerY + 10);
    //timeout to see the change
    await page.waitForTimeout(5000);

    await page.mouse.up();

    const imageSizeAfter = (await image.boundingBox()) as imageSize;
    expect(imageSizeAfter.width).toBeCloseTo(imageSizeBefore.width + 10);
    expect(imageSizeAfter.height).toBeCloseTo(imageSizeBefore.height + 10);
  });
});
