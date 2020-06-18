const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const path = require("path");

let { link } = require("./extractedLink");
const { clear } = require("console");

//choose between graphql_js_docs or graphql_learn_docs
link = link.jest_js_docs;

async function fetchData(link) {
  const result = await axios.get(link);
  const $ = await cheerio.load(result.data);
  $(".read-next").remove().html();
  const scrappedContent = $;
  return scrappedContent;
}

async function writeToFile(dirName, fileName, data) {
  fs.appendFileSync(path.join(__dirname, dirName, fileName), data, "UTF8");
}

async function createDir(dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
    return true;
  }
  return false;
}

async function main() {
  const _baseDir = "output";
  createDir(_baseDir);

  for (const urlName in link) {
    let pathName = _baseDir + "/" + urlName;
    createDir(pathName);
    createDir(pathName + "/src");
    createDir(pathName + "/docs");

    fetchData(link[urlName]).then(($) => {
      writeToFile(pathName + "/docs", "docs.md", $(".post").html());
      console.log(pathName);

      writeToFile(
        pathName + "/src",
        `${urlName}.spec.js`,
        $("code.hljs").text()
      );
    });
  }
}

main();
