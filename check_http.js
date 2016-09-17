// Try to make a HTTP GET to a specified URL and retry
// Until a success Response occurs.
//
// Example: node check_http.js http://google.de
const http = require('http');

const URL = process.argv[2]; // Mandatory
const TIMEOUT = process.argv[3] || 5000;
var tryCount = 0;

function errorReaction(err) {
  const feedback = err.statusCode || err;
  console.error("Not available ", feedback);
  setTimeout(doRequest, TIMEOUT);
}

function doRequest() {
  tryCount++;
  console.log(`Requesting ${URL} ... (Approach #${tryCount})`);

  const request = http.get(URL, (response) => {
      if (response.statusCode == 200) {
        console.log("The URL is available!");
      } else {
        errorReaction(response);
      }
    });

  request.on("error", errorReaction);
}

doRequest();