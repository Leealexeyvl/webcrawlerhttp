const { crawlPage } = require("./crawl.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
  }
  if (process.argv.length > 3) {
    console("too many command line args");
  }
  const baseUrl = process.argv[2];

  console.log(`starting crawl of ${baseUrl}...`);

  const pages = await crawlPage(baseUrl, baseUrl, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
