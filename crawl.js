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

module.exports = { normalizeUrl, getUrlsFromHtml };
