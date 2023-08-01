const { normalizeUrl, getUrlsFromHtml } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "https://boot.dev.com/path";
  const actual = normalizeUrl(input);
  const expected = "boot.dev.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "https://boot.dev.com/path/";
  const actual = normalizeUrl(input);
  const expected = "boot.dev.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BOOT.dev.com/path/";
  const actual = normalizeUrl(input);
  const expected = "boot.dev.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "http://boot.dev.com/path";
  const actual = normalizeUrl(input);
  const expected = "boot.dev.com/path";
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml absolute", () => {
  const inputHtml = `
<html>
    <body>
        <a href='http://boot.dev.com/path/'>
            Boot dev
        </a>
    </body>
</html>
  `;
  const inputBaseUrl = "http://boot.dev.com";
  const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
  const expected = ["http://boot.dev.com/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml relative", () => {
  const inputHtml = `
  <html>
      <body>
          <a href='/path/'>
            Boot dev
          </a>
      </body>
  </html>
    `;
  const inputBaseUrl = "http://boot.dev.com";
  const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
  const expected = ["http://boot.dev.com/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml multi", () => {
  const inputHtml = `
  <html>
      <body>
          <a href='/path/'>
            Boot dev
          </a>
          <a href='http://boot.dev.com/contact/'>
            Boot dev
          </a>
      </body>
  </html>
    `;
  const inputBaseUrl = "http://boot.dev.com";
  const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
  const expected = [
    "http://boot.dev.com/path/",
    "http://boot.dev.com/contact/",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHtml bad url", () => {
  const inputHtml = `
  <html>
      <body>
          <a href='invalid'>
            Boot dev
          </a>
      </body>
  </html>
    `;
  const inputBaseUrl = "http://boot.dev.com";
  const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
