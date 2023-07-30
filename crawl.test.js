const { normalizeUrl } = require("./crawl.js");
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
