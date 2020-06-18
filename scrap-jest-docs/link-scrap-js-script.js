// this script should be run in front end console of graphql docs page to extract links of tutorial
// initial page link {https://jestjs.io/docs/en/getting-started}

// To store scraped link
let link = {};

// Scrapper oneliner
$(".navListItem > a").forEach((el, index) => {
  link["Part-" + index + "-" + el.innerHTML] = el.href;
});

// print
console.log(link);

// then copy it to file for later use, here in scrapper its used.
// store here as 'extractedLink.js'
