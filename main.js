const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console("too many command line args");
    process.exit(1);
  }
  const baseUrl = process.argv[2];

  console.log(`starting crawl of ${baseUrl}`);
  crawlPage(baseUrl);
}

main();
