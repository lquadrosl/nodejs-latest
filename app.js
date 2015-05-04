var https = require("https");
var cheerio = require("cheerio");

var baseUrl = "https://nodejs.org";
var currentVersion = '';
var currentVersionRegex = /Current\sVersion\:\s/;

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  https.get(url, function(res) {
    var data = "";
    
    res.on('data', function (chunk) {
      data += chunk;
    });
    
    res.on("end", function() {
      callback(data, undefined);
    });

  }).on("error", function(e) {
    callback(undefined, e);
  });
}

download(baseUrl, function(data, error) {
  if (data) {
    //console.log(data);

    var $ = cheerio.load(data);
    
    // select html node with version information
    $("#intro > p").each(function(i, e) {
      if (i === 1) {
        currentVersion = $(e).html();

        // remove 'Current Version:' from string
        currentVersion = currentVersion.replace(currentVersionRegex, '');

        // outputs current version available
        console.log(currentVersion);
      }
    });

  } else if (error !== undefined) {
    console.log("error", error);  
  }
});
