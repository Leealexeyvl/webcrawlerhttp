function normalizeUrl(urlString) {
  //   return urlString.replace(/^https?:\/\//i, "");
  const url = new URL(urlString);
  const hostpath = `${url.hostname}${url.pathname}`;
  if (hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  } else {
    return hostpath;
  }
}

module.exports = { normalizeUrl };
