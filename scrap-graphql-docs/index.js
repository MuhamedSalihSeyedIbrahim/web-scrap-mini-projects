const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const path = require("path");

let { link } = require("./extractedLink");
link = link.graphql_js_docs;

const BASE_URL = "https://graphql.org/";

async function fetchData(link) {
  const result = await axios.get(link);
  const $ = await cheerio.load(result.data);
  $(".read-next").remove().html();
  const scrappedContent = $;
  return scrappedContent;
}

async function scrapImages(imageUrl, dirName) {
  if (imageUrl) return;

  dirName = dirName + "/img";
  createDir(dirName);

  const imgUrl = BASE_URL + imageUrl.attr("src");
  axios
    .get(imgUrl, {
      responseType: "stream",
    })
    .then((response) => {
      console.log(dirname + "/" + url.substring(url.lastIndexOf("/") + 1));
      response.data.pipe(
        fs.createWriteStream(
          dirName + "/" + url.substring(url.lastIndexOf("/") + 1)
        )
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

async function writeToFile(dirName, fileName, data) {
  fs.writeFileSync(path.join(__dirname, dirName, fileName), data, "UTF8");
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

    pathName = pathName + "/docs";
    createDir(pathName);

    fetchData(link[urlName]).then(($) => {
      scrapImages($(".inner-content").find("img"), pathName);
      writeToFile(pathName, "docs.md", $(".inner-content").html());
      console.log(pathName);
    });
  }
}

main();
