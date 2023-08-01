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

async function crawlPage(currentUrl) {
  console.log(`actively crawling: ${currentUrl}`);

  try {
    const response = await fetch(currentUrl);
    if (response.status > 399) {
      console.log(
        `error in fetch with status code: ${response.status} on page: ${currentUrl}`
      );
      return;
    }
    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response with content-type: ${contentType} on page: ${currentUrl}`
      );
      return;
    }
    console.log(await response.text());
  } catch (err) {
    console.log(`error in fetch: ${err.message} on page: ${currentUrl}`);
  }
}

module.exports = { normalizeUrl, getUrlsFromHtml, crawlPage };
