/**
 * @jest-environment puppeteer
 */

describe("AddItemForm", () => {
  it("basic example, visually looks correct", async () => {
    // API from jes-puppeteer
    await page.goto(
      "http://localhost:6006/iframe.html?id=additemform-component--add-item-form-base-example&viewMode=story"
    )
    const image = page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
