const { JSDOM } = require("jsdom");

function getUrlsFromHtml(html, baseUrl) {
  const urls = [];
  const dom = new JSDOM(html);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative
      try {
        const urlObj = new URL(`${baseUrl}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  //   return urlString.replace(/^https?:\/\//i, "");
  const url = new URL(urlString);
  const hostpath = `${url.hostname}${url.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}

async function crawlPage(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);
  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizedCurrentUrl = normalizeUrl(currentUrl);
  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl]++;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1;

  console.log(`actively crawling: ${currentUrl}`);

  try {
    const response = await fetch(currentUrl);
    if (response.status > 399) {
      console.log(
        `error in fetch with status code: ${response.status} on page: ${currentUrl}`
      );
      return pages;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response with content-type: ${contentType} on page: ${currentUrl}`
      );
      return pages;
    }

    const htmlBody = await response.text();

    const nextURLs = getUrlsFromHtml(htmlBody, baseUrl);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseUrl, nextURL, pages);
    }
  } catch (err) {
    console.log(`error in fetch: ${err.message} on page: ${currentUrl}`);
  }
  return pages;
}

module.exports = { normalizeUrl, getUrlsFromHtml, crawlPage };
