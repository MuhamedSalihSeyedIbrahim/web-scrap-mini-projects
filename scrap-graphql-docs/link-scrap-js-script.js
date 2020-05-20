// this script should be run in front end console of graphql docs page to extract links of tutorial
// initial page link { https://graphql.org/graphql-js/ }

// To store scraped link
let link ={};

// Scrapper oneliner
$('.nav-docs').find('a').forEach( (el,index) => link['Part-'+index+'-'+el.innerHTML]="https://graphql.org/"+el.getAttribute('href'));

// print 
console.log(link);

// then copy it to file for later use, here in scrapper its used.
// store here as 'extractedLink.js'